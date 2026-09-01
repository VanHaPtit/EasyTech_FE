# task-be-01_API_danh_sach_log

## Mục đích
Xác định phạm vi backend cho task 'API danh sach log' trong US-08 Admin Xem Audit Logs, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Điều kiện tiên quyết
- User phải có quyền System Admin (`role = ADMIN`).
- Dữ liệu trả về chỉ mang tính chất Read-only.

## HTTP Method
- `GET`

## Endpoint
- `/api/v1/admin/audit-logs`

## Request
- Query parameters (Tùy chọn):
  - `page`, `size` (mặc định 50).
  - `startDate`, `endDate` (lọc theo khoảng thời gian).
  - `action` (lọc theo loại hành động, ví dụ: LOGIN, CREATE_JOB...).
  - `email` (lọc theo email người thực hiện).

## Response
- Thành công: `BaseResponse(status = 1, message, data)` chứa pageable của audit logs, bao gồm `id`, `action`, `createdAt`, thông tin `actor` (id, email, fullName), `targetType`, `targetId`, `ipAddress`. Không trả về toàn bộ payload metadata to để tối ưu.

## API JSON Contract
```json
{
  "status": 1,
  "message": "Lấy danh sách audit logs thành công.",
  "data": {
    "content": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "action": "CREATE_JOB",
        "actor": {
          "id": 10,
          "email": "hr@techa.com",
          "fullName": "Nguyen Van A"
        },
        "targetType": "JOB",
        "targetId": "987",
        "ipAddress": "192.168.1.1",
        "createdAt": "2026-08-31T10:05:00"
      }
    ],
    "totalElements": 1500,
    "totalPages": 30
  }
}
```
