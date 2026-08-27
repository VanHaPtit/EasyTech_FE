# T-14-01 · API `GET /api/applications`
> **Story:** [STORY-14](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

## Endpoint
```
GET /api/applications?jobId=&status=&search=&page=0&size=50
Authorization: Bearer {token}
```

## Response (200)
```json
{
  "content": [
    {
      "id": "app-uuid",
      "candidate": { "id": "...", "name": "Nguyễn Văn B", "email": "...", "phone": "..." },
      "status": "IN_PROGRESS",
      "currentRound": { "id": "round-uuid", "name": "Technical Interview", "orderIndex": 2 },
      "aiScore": 78,
      "appliedAt": "2026-08-20",
      "cvUrl": "/uploads/cv/..."
    }
  ],
  "totalElements": 35
}
```

## Notes
- Filter `business_id` từ JWT (bắt buộc)
- Kanban load tất cả (size=50, không pagination) để group theo status
