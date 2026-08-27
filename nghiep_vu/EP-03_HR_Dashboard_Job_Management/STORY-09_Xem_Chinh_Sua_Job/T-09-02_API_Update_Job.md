# T-09-02 · API `PUT /api/jobs/{id}`
> **Story:** [STORY-09](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Endpoint
```
PUT /api/jobs/{id}
Authorization: Bearer {token}
Content-Type: application/json
```

## Lưu ý triển khai

- Chỉ cho phép cập nhật khi job có trạng thái `INACTIVE` hoặc `ACTIVE` (không áp dụng cho `CLOSED`)
- Xác thực quyền sở hữu business từ JWT (HR chỉ được sửa job của chính mình)
- Khi cập nhật `description` của job đang `ACTIVE` → vẫn giữ nguyên trạng thái `ACTIVE`, không cần publish lại

## Response (200)
```json
{ "id": "job-uuid", "title": "...", "updatedAt": "2026-08-27T..." }
```
