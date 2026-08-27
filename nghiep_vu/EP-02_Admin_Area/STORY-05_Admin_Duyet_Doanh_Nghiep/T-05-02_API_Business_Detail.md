# T-05-02 · API `GET /api/admin/businesses/{id}`

> **Story:** [STORY-05](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Endpoint
```
GET /api/admin/businesses/{id}
Authorization: Bearer {adminToken}
```

## Response (200)
```json
{
  "id": "biz-uuid",
  "name": "Công ty ABC",
  "industry": "IT",
  "phone": "0901234567",
  "address": "...",
  "website": "...",
  "status": "PENDING",
  "rejectedReason": null,
  "hr": { "id": "user-uuid", "name": "...", "email": "..." },
  "createdAt": "..."
}
```
