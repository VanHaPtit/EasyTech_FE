# task-be-01_API_danh_sach_nguoi_dung

## Mục đích
Xác định phạm vi backend cho task 'API danh sach nguoi dung' trong US-09 Admin Users Management, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

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
- `/api/v1/admin/users`

## Request
- Query parameters (Tùy chọn):
  - `page`, `size` (mặc định 20).
  - `search` (tìm theo tên, email).
  - `companyId` (lọc theo công ty).
  - `role` (lọc theo quyền: HR, HR_ADMIN, ADMIN).
  - `status` (lọc theo trạng thái: ACTIVE, INACTIVE, PENDING).

## Response
- Thành công: `BaseResponse(status = 1, message, data)` chứa pageable của users, bao gồm `id`, `fullName`, `email`, `companyName`, `role`, `status`, `createdAt`, `lastLoginAt`.

## API JSON Contract
```json
{
  "status": 1,
  "message": "Lấy danh sách người dùng thành công.",
  "data": {
    "content": [
      {
        "id": 10,
        "fullName": "Nguyen Van A",
        "email": "hr@techa.com",
        "companyName": "TechA Solutions",
        "role": "HR_ADMIN",
        "status": "ACTIVE",
        "createdAt": "2026-08-01T10:00:00",
        "lastLoginAt": "2026-08-31T09:00:00"
      }
    ],
    "totalElements": 250,
    "totalPages": 13
  }
}
```
