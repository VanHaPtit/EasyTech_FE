# task-be-01_API_quen_mat_khau

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-01 API quen mat khau.

## Mô tả chức năng chi tiết
Nhận địa chỉ email từ client. Backend truy vấn DB xem email có tồn tại không. Nếu có, sinh ra mã OTP 6 chữ số (hoặc JWT reset token ngắn hạn), băm (hash) mã này rồi lưu vào Database hoặc Redis (kèm TTL 5-10 phút). Cuối cùng, trigger gửi email chứa mã OTP đến người dùng.

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
