# Task BE API: API Create Interview

## Mục đích
Cung cấp API backend phục vụ US-13 - Đặt lịch phỏng vấn với contract rõ ràng và validate tại server.

## User Story liên quan
- US-13 - Dat Lich Phong Van.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/applications/{applicationId}/interviews`

## Request
- Thời gian, địa điểm/link, interviewer, roundId và message.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Interview schedule vừa tạo.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không có state transition trực tiếp.

## Side Effects
- Gửi email mời phỏng vấn có magic link.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract
**Endpoint:** `POST /api/v1/applications/{applicationId}/interviews`
### Request Body
```json
{
  "roundId": 202,
  "interviewTime": "2026-09-05T09:00:00",
  "durationMinutes": 60,
  "location": "Google Meet Link",
  "candidateNote": "Prepare portfolio"
}
```
### Response (201 Created)
```json
{
  "status": 1,
  "message": "Tạo lịch phỏng vấn thành công",
  "data": {
    "id": 401,
    "applicationId": 301,
    "roundId": 202,
    "status": "SCHEDULED",
    "interviewTime": "2026-09-05T09:00:00",
    "durationMinutes": 60,
    "magicLink": "https://easytech.vn/interview/abc"
  }
}
```

