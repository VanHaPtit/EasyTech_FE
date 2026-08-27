# T-06-02 · API GET /api/dashboard/chart

> **Story:** [STORY-06](./STORY.md) · **Tag:** [BE] · **SP:** 2

## Endpoint
```
GET /api/dashboard/chart?months=6
```

## Response (200)
```json
{
  "data": [
    { "month": "2026-03", "count": 5 },
    { "month": "2026-04", "count": 12 },
    { "month": "2026-05", "count": 8 },
    { "month": "2026-06", "count": 15 },
    { "month": "2026-07", "count": 20 },
    { "month": "2026-08", "count": 10 }
  ]
}
```

## Query
```sql
SELECT TO_CHAR(created_at, 'YYYY-MM') AS month, COUNT(*) AS count
FROM applications a JOIN job_posts j ON a.job_id = j.id
WHERE j.business_id = :businessId
  AND a.created_at >= NOW() - INTERVAL ':months months'
GROUP BY month ORDER BY month
```
