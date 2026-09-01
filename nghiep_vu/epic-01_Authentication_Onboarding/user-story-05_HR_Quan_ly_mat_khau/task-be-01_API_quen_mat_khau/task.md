# task-be-01_API_quen_mat_khau

## Mục đích
Xác định phạm vi backend cho task 'API quen mat khau' trong US-05 HR Quan ly mat khau, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

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
