# T-08-01 · API `POST /api/jobs` — Tạo job mới

> **Story:** [STORY-08](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

## Endpoint
```
POST /api/jobs
Authorization: Bearer {token}
Content-Type: application/json
```

## Request
```json
{
  "title": "Senior Backend Developer",
  "categoryId": "cat-uuid",
  "location": "TP.HCM (Hybrid)",
  "salaryMin": 30000000,
  "salaryMax": 50000000,
  "salaryCurrency": "VND",
  "jobType": "FULL_TIME",
  "experienceLevel": "SENIOR",
  "description": "## About the role...",
  "requirements": "## Requirements...",
  "benefits": "## Benefits..."
}
```

## Response (201)
```json
{
  "id": "job-uuid-real",
  "title": "Senior Backend Developer",
  "status": "INACTIVE",
  "createdAt": "2026-08-27T..."
}
```

## Logic
```java
// JobService.create()
1. Validate required fields
2. Gán businessId từ JWT
3. Set status = INACTIVE
4. Generate slug từ title
5. Save và return DTO
```

## Files
| File | Action |
|------|--------|
| `JobController.java` | `POST /api/jobs` |
| `JobService.java` | `createJob()` |
| `JobRepository.java` | JPA Repository |
| `CreateJobRequest.java` | DTO + @Valid |
| `JobResponse.java` | DTO response |
