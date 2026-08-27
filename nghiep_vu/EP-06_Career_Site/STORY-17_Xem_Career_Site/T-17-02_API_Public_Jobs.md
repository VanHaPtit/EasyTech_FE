# T-17-02 · API `GET /api/public/companies/{slug}/jobs`
> **Story:** [STORY-17](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Endpoint (Public - No Auth)
```
GET /api/public/companies/cong-ty-abc/jobs?status=ACTIVE
```

## Response (200)
```json
[
  {
    "id": "job-uuid",
    "slug": "senior-backend-dev",
    "title": "Senior Backend Developer",
    "location": "TP.HCM",
    "jobType": "FULL_TIME",
    "salaryMin": 30000000,
    "salaryMax": 50000000,
    "publishedAt": "2026-08-20"
  }
]
```
