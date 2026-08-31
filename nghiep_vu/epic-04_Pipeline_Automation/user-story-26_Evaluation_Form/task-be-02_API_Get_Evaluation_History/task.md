# Task BE API: Get Evaluation History

## Mục đích
API để lấy lịch sử các phiếu đánh giá của một ứng viên.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.

## Endpoint đề xuất
- GET /api/v1/applications/{applicationId}/evaluations

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
