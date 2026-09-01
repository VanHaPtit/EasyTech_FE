# task-be-03_API_tao_mau_email

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-03 API tao mau email.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.



## User Story liên quan
- US-29 - Email Templates.

## Điều kiện tiên quyết
- User đã đăng nhập và có quyền quản lý Email Template.
- Backend kiểm tra ownership theo `company_id`.
- Template phải dùng đúng danh sách biến nội suy được hỗ trợ.

## API contract

### POST /api/v1/email-templates
- Mục đích: tạo Email Template mới.
- Request: `templateName`, `subject`, `bodyHtml`, `type`, danh sách `variables`.
- Response: Email Template vừa tạo.

## Validation
- `templateName` và `subject` không được rỗng.
- `bodyHtml` phải hợp lệ và không chứa biến ngoài danh sách cho phép.

## State Transition
- Không đổi trạng thái Company/User/Job/Application.

## Side Effects
- Ghi audit log khi tạo template.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc biến nội suy sai.
- 401: chưa đăng nhập.
- 403: không có quyền quản lý Email Template.

## 3. API JSON Contract
**Endpoint:** `POST /api/v1/email-templates`

### Request Body
```json
{
  "templateName": "Default Pass Template",
  "type": "PASS",
  "subject": "Chúc mừng {{candidateName}}",
  "bodyHtml": "<p>Xin chào {{candidateName}}, bạn đã vượt qua vòng tuyển dụng.</p>",
  "variables": [
    "candidateName",
    "jobTitle",
    "companyName"
  ],
  "isActive": true
}
```

### Response (201 Created)
```json
{
  "status": 1,
  "message": "Tạo Email Template thành công",
  "data": {
    "id": 501,
    "templateName": "Default Pass Template",
    "type": "PASS",
    "subject": "Chúc mừng {{candidateName}}",
    "bodyHtml": "<p>Xin chào {{candidateName}}, bạn đã vượt qua vòng tuyển dụng.</p>",
    "variables": [
      "candidateName",
      "jobTitle",
      "companyName"
    ],
    "isActive": true,
    "createdAt": "2026-08-31T10:00:00"
  }
}
```

---

## Thiết kế Database – Bảng email_templates

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

---

## Khởi tạo Dữ liệu (Seeding) – Mẫu Email Mặc định

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
