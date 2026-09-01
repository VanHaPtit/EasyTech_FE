# task-be-02_API_gui_lai_email

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-02 API gui lai email.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Retry Email

## Mục đích
API để gửi lại một email bị lỗi (FAILED).

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
