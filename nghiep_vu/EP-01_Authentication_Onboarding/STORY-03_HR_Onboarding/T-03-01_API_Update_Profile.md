# T-03-01 · API `PUT /api/businesses/{id}/profile`

> **Story:** [STORY-03](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Endpoint
```
PUT /api/businesses/{id}/profile
Authorization: Bearer {token}
Content-Type: application/json
```

## Request
```json
{
  "name": "Công ty ABC",
  "phone": "0901234567",
  "address": "123 Nguyễn Huệ, Q1, HCM",
  "website": "https://abc.com",
  "description": "Chúng tôi là công ty..."
}
```

## Response (200)
```json
{ "id": "biz-uuid", "name": "Công ty ABC", "updatedAt": "..." }
```

## Notes
- Chỉ HR của business đó mới được update (check `businessId` từ JWT)
- Logo được upload riêng qua T-03-02
