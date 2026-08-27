# T-07-02 · API `GET /api/jobs`

> **Story:** [STORY-07](./STORY.md) · **Tag:** `[BE]` · **SP:** 2
> **Phụ thuộc:** T-07-01

## Endpoint
```
GET /api/jobs?search=&status=&page=0&size=10&sort=createdAt,desc
Authorization: Bearer {token}
```

## Response (200)
```json
{
  "content": [
    {
      "id": "job-uuid",
      "title": "Senior Backend Developer",
      "location": "TP.HCM",
      "jobType": "FULL_TIME",
      "status": "ACTIVE",
      "applicantCount": 15,
      "publishedAt": "2026-08-20",
      "createdAt": "2026-08-15"
    }
  ],
  "totalElements": 8,
  "totalPages": 1,
  "currentPage": 0
}
```

## Notes
- Filter bắt buộc `business_id` từ JWT
- `applicant_count` được cập nhật mỗi khi có application mới nộp vào (dùng counter cache để tối ưu performance)
