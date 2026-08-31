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
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
