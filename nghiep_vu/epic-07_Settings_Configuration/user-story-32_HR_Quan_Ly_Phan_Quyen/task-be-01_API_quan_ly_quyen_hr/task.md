# task-be-01_API_quan_ly_quyen_hr

## Mục đích
Xác định phạm vi backend cho task 'API quan ly quyen hr' trong US-32 HR Quan Ly Phan Quyen, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

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
