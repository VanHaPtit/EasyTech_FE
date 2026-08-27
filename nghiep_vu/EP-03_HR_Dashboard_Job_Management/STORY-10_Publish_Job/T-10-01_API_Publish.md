# T-10-01 · API `PUT /api/jobs/{id}/publish`
> **Story:** [STORY-10](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

## Endpoint
```
PUT /api/jobs/{id}/publish
Authorization: Bearer {token}
```

## Business Logic
```java
public void publishJob(UUID jobId, UUID businessId) {
    Job job = jobRepo.findByIdAndBusinessId(jobId, businessId).orElseThrow();
    
    // Validate: phải có ít nhất 1 vòng
    int roundCount = roundRepo.countByJobId(jobId);
    if (roundCount == 0) {
        throw new ValidationException("Cần cấu hình ít nhất 1 vòng tuyển dụng trước khi publish");
    }
    
    job.setStatus(JobStatus.ACTIVE);
    job.setPublishedAt(LocalDateTime.now());
    jobRepo.save(job);
}
```

## Response (200)
```json
{ "id": "job-uuid", "status": "ACTIVE", "publishedAt": "2026-08-27T..." }
```

## Error (400)
```json
{ "error": "PIPELINE_NOT_CONFIGURED", "message": "Cần cấu hình ít nhất 1 vòng tuyển dụng trước khi publish" }
```
