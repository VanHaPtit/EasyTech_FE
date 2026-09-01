# Task BE API: Lấy danh sách Audit Logs

## Mục đích
Cung cấp API backend phục vụ US-08 - Admin xem và lọc nhật ký hoạt động hệ thống.

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
