# task-be-02_API_chi_tiet_log

## Mục đích
Xác định phạm vi backend cho task 'API chi tiet log' trong US-08 Admin Xem Audit Logs, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

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
