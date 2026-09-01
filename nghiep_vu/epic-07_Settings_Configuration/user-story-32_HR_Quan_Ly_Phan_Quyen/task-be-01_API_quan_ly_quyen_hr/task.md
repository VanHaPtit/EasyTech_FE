# task-be-01_API_quan_ly_quyen_hr

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-01 API quan ly quyen hr.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Manage HR Roles

## Mục đích
API phân quyền (chuyển đổi role giữa HR và HR_ADMIN) hoặc mời thành viên mới vào công ty.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id). User thực hiện phải là HR_ADMIN.
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.
- Quản lý Audit Log cho các hành động thay đổi dữ liệu quan trọng.

## Endpoint đề xuất
- POST /api/v1/companies/me/members (Mời mới)
- PUT /api/v1/companies/me/members/{userId}/role (Sửa role)
- DELETE /api/v1/companies/me/members/{userId} (Xóa khỏi công ty)

## API JSON Contract

### Request Body - Mời thành viên
```json
{
  "email": "hr.member@techa.vn",
  "fullName": "Tran Thi C",
  "role": "HR"
}
```

### Request Body - Cập nhật role
```json
{
  "role": "HR_ADMIN"
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Cập nhật phân quyền nhân sự thành công.",
  "data": {
    "userId": 21,
    "email": "hr.member@techa.vn",
    "fullName": "Tran Thi C",
    "role": "HR_ADMIN",
    "status": "ACTIVE"
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Không có quyền quản lý phân quyền hoặc role không hợp lệ.",
  "data": null
}
```
