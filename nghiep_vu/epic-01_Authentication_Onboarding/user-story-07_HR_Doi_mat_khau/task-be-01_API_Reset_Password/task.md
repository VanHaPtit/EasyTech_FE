# Task BE API: API Reset Password

## 3. API JSON Contract

**Endpoint:** `POST /api/v1/auth/reset-password`
**Mô tả:** Đặt lại mật khẩu HR bằng reset token đã được cấp sau bước xác thực OTP.

### Request Body
```json
{
  "resetToken": "reset_token_ngan_han",
  "newPassword": "NewPassword@123",
  "confirmPassword": "NewPassword@123"
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Đặt lại mật khẩu thành công.",
  "data": null
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Reset token không hợp lệ hoặc mật khẩu không đạt yêu cầu.",
  "data": null
}
```
