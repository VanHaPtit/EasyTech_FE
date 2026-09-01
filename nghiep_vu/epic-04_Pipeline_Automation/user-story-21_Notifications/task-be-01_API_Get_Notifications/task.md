# Task BE API: Get Notifications

## Mục đích
API lấy danh sách thông báo in-app của HR, hỗ trợ phân trang và filter trạng thái đọc.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.

## Endpoint đề xuất
- GET /api/v1/notifications

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
