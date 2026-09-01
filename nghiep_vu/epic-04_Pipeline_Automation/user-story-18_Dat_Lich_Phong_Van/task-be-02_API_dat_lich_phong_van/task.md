# task-be-02_API_dat_lich_phong_van

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-02 API dat lich phong van.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: API Create Interview

## Mục đích
Cung cấp API backend phục vụ US-18 - Đặt lịch phỏng vấn với contract rõ ràng và validate tại server.

## User Story liên quan
- US-18 - Dat Lich Phong Van.

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

---

## Thiết kế Database – Bảng interview_schedules

## Bảng/entity liên quan
- Bảng chính: `job_rounds`, `round_statuses`, `email_templates`, `email_logs`, `interview_schedules`.
- Mỗi bảng phải có id làm Primary Key, created_at, updated_at và is_deleted nếu cần xóa mềm.
- Các bảng thuộc tenant phải có company_id và index theo company_id.

## Column và kiểu dữ liệu
- Dùng UUID cho khóa chính/khóa ngoại.
- Dùng VARCHAR cho mã, email, slug, enum dạng text.
- Dùng TEXT cho nội dung dài như mô tả, lý do từ chối, email body hoặc AI explanation.
- Dùng TIMESTAMP cho thời điểm tạo/cập nhật/gửi email/đánh giá.
- - Enum/status liên quan: Round Result = `IN_PROGRESS`/`PASSED`/`FAILED`; Application Status = `ACTIVE`/`REJECTED`/`HIRED` nếu task trực tiếp cập nhật hồ sơ.

## Khóa và ràng buộc
- Primary Key: id.
- Foreign Key: trỏ đúng entity cha, đặc biệt company_id, job_id, pplication_id, ound_id, user_id.
- Constraint bắt buộc cho field nghiệp vụ chính; không cho dữ liệu mồ côi giữa company, job, application và round.
- Unique index cho các mã định danh như email, tax code, slug hoặc template key theo phạm vi tenant nếu nghiệp vụ yêu cầu.

## Migration
- Tạo migration idempotent theo thứ tự triển khai.
- Có giá trị mặc định rõ ràng cho status và boolean flag.

## Relationship
- Dữ liệu phải giữ đúng multi-tenant boundary theo company_id.
- Xóa mềm không được làm mất audit/history cần phục vụ báo cáo hoặc truy vết.
