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

### Request Body
```json
{
  "verifyEmail": "candidate@example.com",
  "response": "CONFIRMED",
  "declineReason": null,
  "proposedTime": null,
  "rescheduleReason": null
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Ghi nhận phản hồi lịch phỏng vấn thành công.",
  "data": {
    "interviewId": 3001,
    "applicationId": 2001,
    "response": "CONFIRMED",
    "respondedAt": "2026-08-31T10:00:00"
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Link không hợp lệ, email xác minh không khớp hoặc lịch phỏng vấn đã được phản hồi.",
  "data": null
}
```
