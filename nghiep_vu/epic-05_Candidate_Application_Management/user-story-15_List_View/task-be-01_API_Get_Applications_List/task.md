# Task BE API: Get Applications List

## Mục đích
API lấy danh sách hồ sơ ứng viên dạng bảng/list, hỗ trợ filter phức tạp (trạng thái, vòng, job, nguồn).

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.

## Endpoint đề xuất
- GET /api/v1/applications

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
