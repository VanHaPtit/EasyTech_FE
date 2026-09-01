# Task BE API: Trigger AI Matching

## Mục đích
API kích hoạt quá trình AI quét data ứng viên cũ để gợi ý cho Job mới.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Gọi service AI bên dưới một cách bất đồng bộ (async).

## Endpoint đề xuất
- POST /api/v1/jobs/{jobId}/ai-matching/trigger

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
