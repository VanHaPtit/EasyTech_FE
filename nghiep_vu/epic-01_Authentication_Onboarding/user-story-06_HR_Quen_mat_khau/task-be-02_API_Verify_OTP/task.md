# Task BE API: API Verify OTP

## 3. API JSON Contract

**Endpoint:** `POST /api/v1/auth/verify-otp`
**Mô tả:** Xác thực OTP trong luồng quên mật khẩu và trả về reset token ngắn hạn.

### Request Body
```json
{
  "email": "hr@techa.com",
  "otp": "123456"
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Xác thực OTP thành công.",
  "data": {
    "resetToken": "reset_token_ngan_han",
    "expiresInSeconds": 900
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "OTP không hợp lệ hoặc đã hết hạn.",
  "data": null
}
```
