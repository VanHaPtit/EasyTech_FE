# T-02-04 · API `GET /api/auth/me`

> **Story:** [STORY-02](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

---

## API Spec

```
GET /api/auth/me
Authorization: Bearer {accessToken}
```

### Response (200)
```json
{
  "id": "uuid",
  "email": "hr@company.com",
  "name": "Nguyễn Văn A",
  "role": "HR",
  "business": {
    "id": "biz-uuid",
    "name": "Công ty ABC",
    "status": "ACTIVE"
  }
}
```

## Mục đích

FE gọi khi restore session từ localStorage để verify token còn hợp lệ và lấy business status mới nhất (tránh dùng cached status đã thay đổi).

## Files

| File | Action |
|------|--------|
| `AuthController.java` | `GET /api/auth/me` |
| `UserService.java` | `getCurrentUser()` lấy từ SecurityContext |
