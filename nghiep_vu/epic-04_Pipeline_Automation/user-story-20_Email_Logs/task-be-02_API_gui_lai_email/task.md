# task-be-02_API_gui_lai_email

## Mục đích
Xác định phạm vi backend cho task 'API gui lai email' trong US-20 Email Logs, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.
- Quản lý Audit Log cho các hành động thay đổi dữ liệu quan trọng.

## Endpoint đề xuất
- POST /api/v1/admin/email-logs/{logId}/retry

## API JSON Contract

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Gửi lại email thành công.",
  "data": {
    "logId": 9001,
    "status": "SENT",
    "retriedAt": "2026-08-31T10:05:00"
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Chỉ có thể gửi lại email đang ở trạng thái FAILED.",
  "data": null
}
```
