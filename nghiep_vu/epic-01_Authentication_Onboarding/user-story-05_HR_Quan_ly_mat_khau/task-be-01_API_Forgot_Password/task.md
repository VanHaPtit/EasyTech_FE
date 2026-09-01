# Task BE API: API Forgot Password

## 3. API JSON Contract
**Endpoint:** `POST /api/v1/auth/forgot-password`
**Mô tả:** Gửi OTP hoặc liên kết đặt lại mật khẩu đến email HR đã đăng ký.

### Request Body
```json
{
  "email": "hr@techa.com"
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu sẽ được gửi.",
  "data": null
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Email không hợp lệ.",
  "data": null
}
```
