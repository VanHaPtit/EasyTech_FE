# task-be-03_API_cap_nhat_key_ai

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-03 API cap nhat key ai.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: API Update Key

## Mục đích
Cung cấp API backend phục vụ user-story-22 AI Provider với contract rõ ràng và validate tại server.

## User Story liên quan
- US-31 - AI Provider.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `PATCH`

## Endpoint
- `/api/v1/ai-providers/{providerId}/key`

## Request
- API key mới hoặc flag disable provider.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Provider config đã cập nhật, không trả lại secret thô.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không có state transition trực tiếp.

## Side Effects
- Mã hóa/lưu secret và ghi audit log.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract

**Endpoint:** `PATCH /api/v1/ai-providers/{providerId}/key`
**Mô tả:** Cập nhật API key hoặc trạng thái kích hoạt của AI Provider; backend không trả lại secret thô.

### Request Body
```json
{
  "apiKey": "sk-live-new-secret",
  "isActive": true
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Cập nhật AI Provider thành công",
  "data": {
    "id": 1,
    "providerCode": "OPENAI",
    "providerName": "OpenAI",
    "isActive": true,
    "isConfigured": true,
    "maskedKey": "sk-****abcd",
    "updatedAt": "2026-08-31T10:00:00"
  }
}
```

---

## Thiết kế Database – Bảng ai_providers

## Bảng/entity liên quan
- Bảng chính: `company_profiles`, `email_templates`, `ai_providers`, `user_roles`, `permissions`.
- Mỗi bảng phải có id làm Primary Key, created_at, updated_at và is_deleted nếu cần xóa mềm.
- Các bảng thuộc tenant phải có company_id và index theo company_id.

## Column và kiểu dữ liệu
- Dùng UUID cho khóa chính/khóa ngoại.
- Dùng VARCHAR cho mã, email, slug, enum dạng text.
- Dùng TEXT cho nội dung dài như mô tả, lý do từ chối, email body hoặc AI explanation.
- Dùng TIMESTAMP cho thời điểm tạo/cập nhật/gửi email/đánh giá.
- - Enum/status chỉ dùng khi trực tiếp thuộc nghiệp vụ của task.

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
