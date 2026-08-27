# T-09-01 · API `GET /api/jobs/{id}`
> **Story:** [STORY-09](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Response (200)
```json
{
  "id": "job-uuid",
  "title": "Senior Backend Developer",
  "description": "## About the role...",
  "location": "TP.HCM",
  "salary": { "min": 30000000, "max": 50000000, "currency": "VND" },
  "jobType": "FULL_TIME",
  "experienceLevel": "SENIOR",
  "status": "ACTIVE",
  "applicantCount": 15,
  "rounds": [
    { "id": "round-uuid", "name": "CV Review", "orderIndex": 1 }
  ],
  "publishedAt": "2026-08-20",
  "createdAt": "2026-08-15"
}
```
