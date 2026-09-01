# task-be-02_API_xac_thuc_otp

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-02 API xac thuc otp.

## Mô tả chức năng chi tiết
API nhận email và mã OTP. Backend so khớp mã OTP do client gửi với mã lưu trong DB/Redis. Kiểm tra thời gian hết hạn (expiration time). Nếu hợp lệ, cấp trả một temporary token (hoặc boolean flag) cho phép chuyển sang bước đổi mật khẩu.

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
