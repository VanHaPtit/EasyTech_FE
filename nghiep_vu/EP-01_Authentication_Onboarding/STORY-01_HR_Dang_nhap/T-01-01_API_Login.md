# T-01-01 · API `POST /api/auth/login`

> **Story:** [STORY-01 HR Đăng nhập](./STORY.md)
> **Tag:** `[BE]`
> **SP:** 2
> **Phụ thuộc:** T-01-08 (bảng `users` phải tồn tại)

---

## Mô tả

Tạo endpoint đăng nhập bằng email/password. Endpoint xác thực thông tin đăng nhập, kiểm tra trạng thái tài khoản và trả về JWT access token + refresh token.

---

## Tech Stack

- **Framework:** Spring Boot 3.x
- **Security:** Spring Security + JJWT (io.jsonwebtoken)
- **Password:** BCryptPasswordEncoder
- **Layer:** Controller → Service → Repository

---

## Files liên quan

| File | Action |
|------|--------|
| `AuthController.java` | Thêm endpoint `POST /api/auth/login` |
| `AuthService.java` | Implement logic xác thực |
| `JwtUtil.java` | Generate accessToken + refreshToken |
| `UserRepository.java` | `findByEmail(String email)` |
| `LoginRequest.java` | DTO request |
| `AuthResponse.java` | DTO response |
| `SecurityConfig.java` | Permit `/api/auth/**` without auth |

---

## API Specification

### Endpoint
```
POST /api/auth/login
Content-Type: application/json
```

### Request Body
```json
{
  "email": "hr@company.com",
  "password": "SecurePass123"
}
```

### Response — Success (200)
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "user": {
    "id": "uuid-123",
    "email": "hr@company.com",
    "name": "Nguyễn Văn A",
    "role": "HR",
    "businessId": "biz-uuid-456",
    "businessStatus": "ACTIVE"
  }
}
```

### Response — Error (401) Sai credentials
```json
{
  "error": "INVALID_CREDENTIALS",
  "message": "Email hoặc mật khẩu không đúng"
}
```

### Response — Error (403) Tài khoản chưa active
```json
{
  "error": "ACCOUNT_NOT_ACTIVE",
  "message": "Tài khoản chưa được duyệt",
  "businessStatus": "PENDING"
}
```

---

## Business Logic

```java
// AuthService.login()
1. Tìm user theo email (nếu không có → throw InvalidCredentialsException)
2. BCrypt.matches(rawPassword, user.passwordHash) (nếu sai → throw InvalidCredentialsException)
3. Kiểm tra user.business.status:
   - PENDING  → throw AccountNotActiveException("PENDING")
   - REJECTED → throw AccountNotActiveException("REJECTED")
   - BLOCKED  → throw AccountNotActiveException("BLOCKED")
   - ACTIVE   → tiếp tục
4. Tạo JWT:
   - accessToken: claims { userId, email, role, businessId }, exp 15 phút
   - refreshToken: claims { userId }, exp 7 ngày
5. Lưu refreshToken hash vào DB (bảng refresh_tokens hoặc field trong users)
6. Return AuthResponse
```

---

## JWT Payload

```json
// accessToken claims
{
  "sub": "user-uuid",
  "email": "hr@company.com",
  "role": "HR",
  "businessId": "biz-uuid",
  "iat": 1700000000,
  "exp": 1700000900
}
```

---

## Error Codes

| HTTP | Code | Khi nào |
|------|------|---------|
| 401 | `INVALID_CREDENTIALS` | Sai email hoặc password |
| 403 | `ACCOUNT_NOT_ACTIVE` | Status PENDING/REJECTED/BLOCKED |
| 400 | `VALIDATION_ERROR` | Request body thiếu field |

---

## Notes & Edge Cases

- Không phân biệt lỗi "email không tồn tại" vs "sai password" (tránh user enumeration attack)
- Rate limit: tối đa 5 lần thất bại/IP/15 phút (dùng `Bucket4j` hoặc Redis counter)
- Log failed login attempts
