# task-be-02_API_chi_tiet_nguoi_dung

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-02 API chi tiet nguoi dung.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Xem chi tiết Người dùng

## Mục đích
Cung cấp API backend phục vụ US-09 - Admin xem chi tiết thông tin, lịch sử đăng nhập và danh sách Job của một tài khoản.

## Điều kiện tiên quyết
- User phải có quyền System Admin (`role = ADMIN`).

## HTTP Method
- `GET`

## Endpoint
- `/api/v1/admin/users/{id}`

## Request
- Path variable: `id` (ID của user).

## Response
- Thành công: `BaseResponse(status = 1, message, data)` chứa thông tin cơ bản, `company` (nếu có), danh sách 10 lần đăng nhập gần nhất, và thống kê Job đã tạo.
- Thất bại: Lỗi 404 nếu không tìm thấy user.

## API JSON Contract
```json
{
  "status": 1,
  "message": "Lấy chi tiết người dùng thành công.",
  "data": {
    "id": 10,
    "fullName": "Nguyen Van A",
    "email": "hr@techa.com",
    "role": "HR",
    "status": "ACTIVE",
    "company": {
      "id": 1,
      "name": "TechA Solutions"
    },
    "jobsCreatedCount": 5,
    "recentLogins": [
      {
        "ipAddress": "192.168.1.5",
        "userAgent": "Chrome/114",
        "loginAt": "2026-08-31T09:00:00"
      }
    ],
    "createdAt": "2026-08-01T10:00:00"
  }
}
```
