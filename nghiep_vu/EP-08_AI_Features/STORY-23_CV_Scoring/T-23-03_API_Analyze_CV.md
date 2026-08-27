# T-23-03 · API `POST /api/applications/{id}/analyze-cv`
> **Story:** [STORY-23](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

## Endpoint (triggered by HR manually hoặc auto)
```
POST /api/applications/{id}/analyze-cv
Authorization: Bearer {token}
```

## Logic (Async)
```java
@PostMapping("/{id}/analyze-cv")
public ResponseEntity<Void> analyzeCV(@PathVariable UUID id) {
    // Tạo cv_analyses record với status=PENDING
    cvAnalysisRepo.save(CvAnalysis.pending(id));
    
    // Async call AI service
    CompletableFuture.runAsync(() -> {
        Application app = appRepo.findById(id).orElseThrow();
        String cvText = fileStorageService.extractText(app.getCandidate().getCvUrl());
        
        CVScoreResponse result = aiServiceClient.scoreCV(cvText, app.getJob().getDescription());
        cvAnalysisRepo.updateResult(id, result, "COMPLETED");
    });
    
    return ResponseEntity.accepted().build(); // 202 Accepted
}
```
