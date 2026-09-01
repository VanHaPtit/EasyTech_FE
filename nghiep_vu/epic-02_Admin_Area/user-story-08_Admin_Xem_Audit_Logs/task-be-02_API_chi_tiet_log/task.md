# task-be-02_API_chi_tiet_log

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-02 API chi tiet log.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Xem chi tiết Audit Log

## Mục đích
Cung cấp API backend phục vụ US-08 - Admin xem chi tiết một bản ghi nhật ký hoạt động, bao gồm payload dữ liệu thay đổi.

## Điều kiện tiên quyết
- User phải có quyền System Admin (`role = ADMIN`).

## HTTP Method
- `GET`

## Endpoint
- `/api/v1/admin/audit-logs/{id}`

## Request
- Path variable: `id` (UUID hoặc ID của log).

## Response
- Thành công: `BaseResponse(status = 1, message, data)` chứa chi tiết log, bao gồm trường `metadata` chứa JSON thông tin thay đổi (before/after), User Agent, và các thông tin sâu hơn.
- Thất bại: Lỗi 404 nếu không tìm thấy log.

## API JSON Contract
```json
{
  "status": 1,
  "message": "Lấy chi tiết audit log thành công.",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "action": "UPDATE_COMPANY_STATUS",
    "actor": {
      "id": 1,
      "email": "admin@easytech.com",
      "fullName": "System Admin"
    },
    "targetType": "COMPANY",
    "targetId": "45",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
    "metadata": {
      "before": {
        "status": "PENDING"
      },
      "after": {
        "status": "ACTIVE"
      }
    },
    "createdAt": "2026-08-31T10:05:00"
  }
}
```
