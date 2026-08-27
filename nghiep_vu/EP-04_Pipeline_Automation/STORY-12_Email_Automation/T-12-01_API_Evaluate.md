# T-12-01 · API `POST /api/applications/{id}/evaluate`

> **Story:** [STORY-12](./STORY.md) · **Tag:** `[BE]` · **SP:** 3

## Endpoint
```
POST /api/applications/{id}/evaluate
Authorization: Bearer {token}
Content-Type: application/json
```

## Request
```json
{ "result": "PASS" }
```

## Response (200)
```json
{
  "applicationId": "app-uuid",
  "result": "PASS",
  "nextRound": { "id": "round-uuid", "name": "Technical Interview", "orderIndex": 2 },
  "newStatus": "IN_PROGRESS",
  "emailSent": true
}
```

## Business Logic

```java
@Transactional
public EvaluateResponse evaluate(UUID appId, String result, UUID hrBusinessId) {
    Application app = appRepo.findByIdWithRounds(appId).orElseThrow();
    
    // Validate: HR thuộc cùng business với job
    validateHRAccess(app.getJob().getBusinessId(), hrBusinessId);
    
    JobRound currentRound = app.getCurrentRound();
    List<JobRound> allRounds = roundRepo.findByJobIdOrderByIndex(app.getJob().getId());
    
    if ("PASS".equals(result)) {
        JobRound nextRound = getNextRound(allRounds, currentRound);
        
        if (nextRound != null) {
            // Chuyển sang vòng tiếp
            app.setCurrentRound(nextRound);
            // Gửi email pass của vòng HIỆN TẠI
            emailService.send(currentRound.getPassEmailTemplateId(), app);
        } else {
            // Vòng cuối → PASSED
            app.setStatus(ApplicationStatus.PASSED);
            emailService.send(currentRound.getPassEmailTemplateId(), app);
        }
    } else { // FAIL
        app.setStatus(ApplicationStatus.REJECTED);
        emailService.send(currentRound.getFailEmailTemplateId(), app);
    }
    
    // Lưu round status history
    roundStatusRepo.save(new ApplicationRoundStatus(appId, currentRound.getId(), result));
    appRepo.save(app);
    
    return buildResponse(app, result);
}
```

## Files
| File | Action |
|------|--------|
| `ApplicationController.java` | `POST /api/applications/{id}/evaluate` |
| `EvaluationService.java` | [NEW] Core evaluation logic |
| `ApplicationRepository.java` | `findByIdWithRounds()` |
