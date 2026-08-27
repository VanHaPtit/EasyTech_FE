# T-11-04 · API `PUT /api/jobs/{id}/rounds/{roundId}`
> **Story:** [STORY-11](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

Cập nhật tên hoặc email template của một vòng. Không thay đổi `orderIndex` qua endpoint này (sử dụng endpoint reorder riêng).

## Request
```json
{
  "name": "Vòng phỏng vấn kỹ thuật",
  "passEmailTemplateId": "tpl-uuid-new",
  "failEmailTemplateId": "tpl-uuid-fail"
}
```

## Response (200)
```json
{
  "id": "round-uuid",
  "name": "Vòng phỏng vấn kỹ thuật",
  "orderIndex": 2
}
```

## Lưu ý
- Validate rằng round thuộc về job, job thuộc về business của HR (từ JWT)
- Không cho phép sửa nếu có ứng viên đang `IN_PROGRESS` ở vòng này (optional)
