# T-06-03 · API GET /api/dashboard/top-jobs

> **Story:** [STORY-06](./STORY.md) · **Tag:** [BE] · **SP:** 1

## Endpoint
```
GET /api/dashboard/top-jobs?limit=5
```

## Response (200)
```json
{
  "jobs": [
    { "id": "job-uuid", "title": "Senior Backend Dev", "applicantCount": 25, "status": "ACTIVE" }
  ]
}
```
