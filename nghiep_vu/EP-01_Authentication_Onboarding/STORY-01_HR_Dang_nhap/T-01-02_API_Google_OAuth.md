# T-01-02 · API `POST /api/auth/google`

> **Story:** [STORY-01 HR Đăng nhập](./STORY.md)
> **Tag:** `[BE]`
> **SP:** 2
> **Phụ thuộc:** T-01-08

---

## Mô tả

Xác thực người dùng thông qua Google OAuth. FE đã lấy `idToken` từ Google, BE verify token này với Google API, tìm hoặc tạo user, rồi trả về JWT.

---

## Tech Stack

- `google-auth-library` hoặc gọi `https://oauth2.googleapis.com/tokeninfo?id_token=`
- Spring Boot, JJWT

## Files liên quan

| File | Action |
|------|--------|
| `AuthController.java` | Thêm `POST /api/auth/google` |
| `GoogleAuthService.java` | Verify idToken với Google |
| `UserRepository.java` | `findByGoogleId()`, `findByEmail()` |
| `GoogleLoginRequest.java` | DTO: `{ idToken }` |

---

## API Specification

### Endpoint
```
POST /api/auth/google
Content-Type: application/json
```

### Request Body
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
}
```

### Response — Success (200)
```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "isNewUser": false,
  "user": {
    "id": "uuid",
    "email": "hr@gmail.com",
    "name": "HR Name",
    "role": "HR",
    "businessId": "biz-uuid",
    "businessStatus": "ACTIVE"
  }
}
```

---

## Business Logic

```
1. Verify idToken với Google:
   GET https://oauth2.googleapis.com/tokeninfo?id_token={idToken}
   → Nhận { sub (google_id), email, name, picture }
2. Tìm user theo google_id → nếu có, dùng user đó
3. Nếu không có, tìm theo email:
   a. Tìm thấy → link google_id vào account hiện có
   b. Không tìm thấy → tạo user mới (status PENDING, chưa có business)
4. Check business.status tương tự T-01-01
5. Sinh JWT và trả về
```

---

## Notes

- `isNewUser: true` khi tạo account mới → FE redirect sang trang Onboarding/Đăng ký bước 2
- Cần config Google Client ID trong `application.yml`
