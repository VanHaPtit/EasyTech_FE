# Task BE API: Manage Form Fields

## Mục đích
API để cấu hình bộ câu hỏi động (form_fields) cho từng Job (CRUD).

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.
- Quản lý Audit Log cho các hành động thay đổi dữ liệu quan trọng.

## Endpoint đề xuất
- POST /api/v1/jobs/{jobId}/form-fields
- PUT /api/v1/jobs/{jobId}/form-fields/{fieldId}
- DELETE /api/v1/jobs/{jobId}/form-fields/{fieldId}

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
