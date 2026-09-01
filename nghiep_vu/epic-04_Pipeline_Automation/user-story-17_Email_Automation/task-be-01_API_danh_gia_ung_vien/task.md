# task-be-01_API_danh_gia_ung_vien

## Mục đích
Xác định phạm vi backend cho task 'API danh gia ung vien' trong US-17 Email Automation, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-17 - Email Automation.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/applications/{applicationId}/rounds/{roundId}/evaluate`

## Request
- Điểm, nhận xét và `result = PASSED|FAILED`.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Round status sau đánh giá.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Round Result = PASSED/FAILED; Application Status chỉ đổi sang REJECTED khi nghiệp vụ reject rõ ràng, không tự HIRED khi final PASSED.

## Side Effects
- Ghi evaluation history và kích hoạt email automation nếu cấu hình.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract

**Endpoint:** `POST /api/v1/applications/{applicationId}/rounds/{roundId}/evaluate`
**Mô tả:** Lưu kết quả đánh giá một vòng và kích hoạt email automation nếu cấu hình yêu cầu.

### Request Body
```json
{
  "result": "PASSED",
  "score": 85,
  "note": "Ứng viên đạt yêu cầu vòng kỹ thuật.",
  "sendEmail": true
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lưu đánh giá vòng tuyển dụng thành công",
  "data": {
    "applicationId": 301,
    "roundId": 202,
    "roundResult": "PASSED",
    "applicationStatus": "ACTIVE",
    "nextRoundId": 203,
    "emailQueued": true,
    "evaluatedAt": "2026-08-31T10:00:00"
  }
}
```

---

## Thiết kế Database – Bảng round_statuses

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
- Foreign Key: trỏ đúng entity cha, đặc biệt company_id, job_id, pplication_id, 
ound_id, user_id.
- Constraint bắt buộc cho field nghiệp vụ chính; không cho dữ liệu mồ côi giữa company, job, application và round.
- Unique index cho các mã định danh như email, tax code, slug hoặc template key theo phạm vi tenant nếu nghiệp vụ yêu cầu.

## Migration
- Tạo migration idempotent theo thứ tự triển khai.
- Có giá trị mặc định rõ ràng cho status và boolean flag.

## Relationship
- Dữ liệu phải giữ đúng multi-tenant boundary theo company_id.
- Xóa mềm không được làm mất audit/history cần phục vụ báo cáo hoặc truy vết.

---

## Internal Service – Xử lý Template Email

## Đầu vào
- Entity hoặc DTO đã được validate từ API/service gọi vào.
- Context tenant gồm company_id, user_id, role và trạng thái truy cập nếu có.
- Cấu hình hệ thống cần thiết như SMTP, AI provider, template hoặc storage.

## Xử lý
- Xử lý gửi/lưu email theo template và trạng thái gửi thực tế.
- Xử lý gửi/lưu email theo template và trạng thái gửi thực tế.
- Thực hiện nghiệp vụ chính theo domain hiện tại, không tự thêm feature ngoài phạm vi story.
- Kiểm tra quyền theo workspace authorization, không trộn với authentication.

## Kết quả đầu ra
- Kết quả xử lý dạng object/service result để API layer đóng gói BaseResponse.
- Thông tin lỗi rõ nguyên nhân và hành động user/admin cần làm tiếp.

## Phụ thuộc
- Repository/database liên quan.
- Email/AI/storage/provider config nếu task cần tích hợp ngoài.
- Audit/logging service khi có thay đổi dữ liệu hoặc side effect quan trọng.

## Side Effects
- Gửi email, ghi audit log, lưu file, lưu AI result hoặc dispatch notification nếu nghiệp vụ yêu cầu.
- Không gửi lặp khi retry nếu action đã thành công trước đó.

## Xử lý lỗi
- Log lỗi đủ context nhưng không log secret/token/API key.
- Retry có kiểm soát cho lỗi tạm thời như SMTP/AI provider.
- Trả lỗi nghiệp vụ có thể hiểu được cho API layer.

---

## Internal Service – Gửi Email qua SMTP

## Đầu vào
- Entity hoặc DTO đã được validate từ API/service gọi vào.
- Context tenant gồm company_id, user_id, role và trạng thái truy cập nếu có.
- Cấu hình hệ thống cần thiết như SMTP, AI provider, template hoặc storage.

## Xử lý
- Xử lý gửi/lưu email theo template và trạng thái gửi thực tế.
- Xử lý gửi/lưu email theo template và trạng thái gửi thực tế.
- Thực hiện nghiệp vụ chính theo domain hiện tại, không tự thêm feature ngoài phạm vi story.
- Kiểm tra quyền theo workspace authorization, không trộn với authentication.

## Kết quả đầu ra
- Kết quả xử lý dạng object/service result để API layer đóng gói BaseResponse.
- Thông tin lỗi rõ nguyên nhân và hành động user/admin cần làm tiếp.

## Phụ thuộc
- Repository/database liên quan.
- Email/AI/storage/provider config nếu task cần tích hợp ngoài.
- Audit/logging service khi có thay đổi dữ liệu hoặc side effect quan trọng.

## Side Effects
- Gửi email, ghi audit log, lưu file, lưu AI result hoặc dispatch notification nếu nghiệp vụ yêu cầu.
- Không gửi lặp khi retry nếu action đã thành công trước đó.

## Xử lý lỗi
- Log lỗi đủ context nhưng không log secret/token/API key.
- Retry có kiểm soát cho lỗi tạm thời như SMTP/AI provider.
- Trả lỗi nghiệp vụ có thể hiểu được cho API layer.
