# Task BE API: Respond Interview

## Mục đích
API cho phép ứng viên xác nhận (ACCEPT) hoặc từ chối (REJECT/RESCHEDULE) lịch phỏng vấn thông qua token bảo mật.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Token phải hợp lệ. Ứng viên chỉ cập nhật được trạng thái bản ghi interview của chính mình.
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.
- Ghi nhận Audit Log (hoặc Notification) để báo cho HR.

## Endpoint đề xuất
- PUT /api/v1/candidates/interview/{interviewId}/respond

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.
