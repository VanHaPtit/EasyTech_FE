# Task BE API: Lấy danh sách Người Dùng (Users)

## Mục đích
Cung cấp API backend phục vụ US-32 - Admin quản lý danh sách toàn bộ tài khoản người dùng trên hệ thống.

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
  "message": "Success",
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
