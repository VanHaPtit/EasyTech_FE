# T-06-01 · API GET /api/dashboard/stats

> **Story:** [STORY-06](./STORY.md) · **Tag:** [BE] · **SP:** 2

## Endpoint
```
GET /api/dashboard/stats
Authorization: Bearer {token}
```

## Response (200)
```json
{
  "totalCandidates": 48,
  "inProgress": 12,
  "passed": 8,
  "rejected": 28
}
```

## Query Logic
```sql
SELECT
  COUNT(*) AS total_candidates,
  COUNT(CASE WHEN status IN ('NEW','IN_PROGRESS') THEN 1 END) AS in_progress,
  COUNT(CASE WHEN status = 'PASSED' THEN 1 END) AS passed,
  COUNT(CASE WHEN status = 'REJECTED' THEN 1 END) AS rejected
FROM applications a
JOIN job_posts j ON a.job_id = j.id
WHERE j.business_id = :businessId
```

## Notes
- Filter bắt buộc theo usiness_id từ JWT (HR chỉ xem DN của mình)
