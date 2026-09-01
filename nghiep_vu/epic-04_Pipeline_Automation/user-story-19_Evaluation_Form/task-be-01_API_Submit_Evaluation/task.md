# Task BE API: Submit Evaluation

## Mục đích
API để HR submit kết quả đánh giá (PASSED/FAILED) và điểm số các tiêu chí cho ứng viên theo vòng phỏng vấn.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.
- Quản lý Audit Log cho các hành động thay đổi dữ liệu quan trọng.

## Endpoint đề xuất
- POST /api/v1/applications/{applicationId}/evaluations

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
