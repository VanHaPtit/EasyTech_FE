# task-be-02_API_chi_tiet_nguoi_dung

## Mục đích
Xác định phạm vi backend cho task 'API chi tiet nguoi dung' trong US-09 Admin Users Management, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

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
