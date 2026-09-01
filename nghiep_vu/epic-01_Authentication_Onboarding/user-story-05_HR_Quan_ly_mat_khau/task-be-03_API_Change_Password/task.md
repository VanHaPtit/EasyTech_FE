# Task BE API: API Reset Password & Change Password

## 3. API JSON Contract

### API đặt lại mật khẩu bằng reset token

**Endpoint:** `POST /api/v1/auth/reset-password`
**Mô tả:** Đặt lại mật khẩu HR bằng reset token đã được cấp sau bước xác thực OTP trong luồng quên mật khẩu.

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

### API chủ động đổi mật khẩu khi đang đăng nhập

**Endpoint:** `POST /api/v1/auth/change-password`
**Mô tả:** Cho phép HR đang đăng nhập đổi mật khẩu bằng mật khẩu hiện tại.

### Request Body
```json
{
  "currentPassword": "OldPassword@123",
  "newPassword": "NewPassword@123",
  "confirmPassword": "NewPassword@123"
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Đổi mật khẩu thành công.",
  "data": null
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Mật khẩu hiện tại không chính xác hoặc mật khẩu mới không đạt yêu cầu.",
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
