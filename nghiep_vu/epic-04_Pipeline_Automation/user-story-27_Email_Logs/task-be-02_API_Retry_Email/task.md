# Task BE API: Retry Email

## Mục đích
API để gửi lại một email bị lỗi (FAILED).

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.
- Quản lý Audit Log cho các hành động thay đổi dữ liệu quan trọng.

## Endpoint đề xuất
- POST /api/v1/admin/email-logs/{logId}/retry

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
