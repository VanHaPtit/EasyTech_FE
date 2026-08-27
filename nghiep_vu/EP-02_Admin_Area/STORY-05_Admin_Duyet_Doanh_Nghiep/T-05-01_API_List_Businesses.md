# T-05-01 · API `GET /api/admin/businesses`

> **Story:** [STORY-05](./STORY.md) · **Tag:** `[BE]` · **SP:** 2
> **Phụ thuộc:** T-02-06

## Endpoint
```
GET /api/admin/businesses?status=PENDING&search=&page=0&size=10
Authorization: Bearer {adminToken}
```

## Response (200)
```json
{
  "content": [
    {
      "id": "biz-uuid",
      "name": "Công ty ABC",
      "industry": "IT",
      "hrEmail": "hr@abc.com",
      "hrName": "Nguyễn Văn A",
      "status": "PENDING",
      "createdAt": "2026-08-20T10:00:00"
    }
  ],
  "totalElements": 25,
  "totalPages": 3,
  "currentPage": 0,
  "size": 10
}
```

## Notes
- Endpoint bảo vệ bởi `@PreAuthorize("hasRole('ADMIN')")`
- Filter `status` là optional (null = lấy tất cả)
- Search tìm theo tên DN hoặc email HR (case-insensitive LIKE)
- Sort mặc định: `createdAt DESC`
