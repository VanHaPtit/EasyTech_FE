# Task BE API: Get Email Logs

## Mục đích
API lấy danh sách lịch sử gửi email (phân trang, lọc theo candidate/status/template).

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.

## Endpoint đề xuất
- GET /api/v1/admin/email-logs

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
