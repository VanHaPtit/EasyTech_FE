# Task BE API: Mark Notifications As Read

## Mục đích
API đánh dấu một hoặc tất cả thông báo là đã đọc.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.

## Endpoint đề xuất
- PUT /api/v1/notifications/mark-read

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
