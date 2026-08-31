# Task BE API: Update Company Info

## Mục đích
API cập nhật thông tin chung của doanh nghiệp (tên, logo, địa chỉ, mst, contact).

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.
- Quản lý Audit Log cho các hành động thay đổi dữ liệu quan trọng.

## Endpoint đề xuất
- PUT /api/v1/companies/me

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
