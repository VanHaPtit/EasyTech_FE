# T-02-01 · API `POST /api/auth/register`

> **Story:** [STORY-02](./STORY.md) · **Tag:** `[BE]` · **SP:** 2
> **Phụ thuộc:** T-01-08, T-02-06

---

## API Spec

### Endpoint
```
POST /api/auth/register
Content-Type: application/json
```

### Request Body
```json
{
  "name": "Nguyễn Văn A",
  "email": "hr@company.com",
  "password": "SecurePass123",
  "companyName": "Công ty ABC",
  "industry": "IT",
  "phone": "0901234567",
  "address": "123 Nguyễn Huệ, Q1, TP.HCM"
}
```

### Response — Success (201)
```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "id": "uuid",
    "email": "hr@company.com",
    "businessStatus": "PENDING"
  }
}
```

### Response — Error (409) Email đã tồn tại
```json
{
  "error": "EMAIL_ALREADY_EXISTS",
  "message": "Email này đã được sử dụng"
}
```

## Business Logic

```
1. Validate request (javax.validation)
2. Check email unique trong bảng users
3. BCrypt.hash(password)
4. Tạo User { email, passwordHash, name, role=HR }
5. Tạo Business { name=companyName, industry, phone, address, status=PENDING, userId }
6. Sinh JWT (accessToken + refreshToken)
7. Return AuthResponse với businessStatus=PENDING
```

## Files

| File | Action |
|------|--------|
| `AuthController.java` | Thêm `POST /api/auth/register` |
| `AuthService.java` | `register()` method |
| `BusinessRepository.java` | `existsByUserId()` |
| `RegisterRequest.java` | DTO với @Valid annotations |
