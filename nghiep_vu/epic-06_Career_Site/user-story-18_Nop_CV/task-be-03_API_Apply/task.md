# Task BE API: API Apply

## Mục đích
Cung cấp API backend phục vụ US-18 - Nộp CV với contract rõ ràng và validate tại server.

## User Story liên quan
- US-18 - Nop CV.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- Endpoint public; Candidate không cần đăng nhập. Backend chỉ trả dữ liệu public hợp lệ theo trạng thái của Job/Career Site.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/public/jobs/{jobId}/applications`

## Request
- Candidate info, CV file, consent và câu trả lời form ứng tuyển.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Application confirmation và tracking token/magic link.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Application Status = ACTIVE.

## Side Effects
- Lưu candidate/application/CV, gửi confirmation email.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract
**Endpoint:** `POST /api/v1/public/jobs/{job_slug}/apply`
### Request Body (Multipart Form-Data)
- `full_name`: "Tran B"
- `email`: "candidate@gmail.com"
- `phone`: "0901234567"
- `cv_file`: [File PDF]
### Response (201 Created)
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "status": "ACTIVE",
    "secure_token": "magic_link_token"
  }
}
```

