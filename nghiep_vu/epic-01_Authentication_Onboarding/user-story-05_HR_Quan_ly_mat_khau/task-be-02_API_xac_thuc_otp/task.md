# task-be-02_API_xac_thuc_otp

## Mục đích
Xác định phạm vi backend cho task 'API xac thuc otp' trong US-05 HR Quan ly mat khau, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

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
