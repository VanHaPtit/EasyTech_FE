# Task BE API: Get AI Suggestions

## Mục đích
API lấy danh sách các ứng viên được AI gợi ý (matching score) cho một Job.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).

## Endpoint đề xuất
- GET /api/v1/jobs/{jobId}/ai-suggestions

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
