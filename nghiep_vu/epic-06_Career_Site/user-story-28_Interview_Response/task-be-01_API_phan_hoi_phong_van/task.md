# task-be-01_API_phan_hoi_phong_van

## Mục đích
Xác định phạm vi backend cho task 'API phan hoi phong van' trong US-28 Interview Response, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

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
