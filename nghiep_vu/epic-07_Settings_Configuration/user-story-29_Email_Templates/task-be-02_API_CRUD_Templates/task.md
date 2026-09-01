# Task BE API: CRUD Email Templates

## Mục đích
Cung cấp API để HR quản lý Email Template trong phạm vi company hiện tại.

## User Story liên quan
- US-29 - Email Templates.

## Điều kiện tiên quyết
- User đã đăng nhập và có quyền quản lý Email Template.
- Backend kiểm tra ownership theo `company_id`.
- Template phải dùng đúng danh sách biến nội suy được hỗ trợ.

## API contract

### GET /api/v1/email-templates
- Mục đích: lấy danh sách Email Template của company hiện tại.
- Request: query params `keyword`, `type`, `page`, `size` nếu cần.
- Response: danh sách template và metadata phân trang.

### POST /api/v1/email-templates
- Mục đích: tạo Email Template mới.
- Request: `templateName`, `subject`, `bodyHtml`, `type`, danh sách `variables`.
- Response: Email Template vừa tạo.

### PATCH /api/v1/email-templates/{templateId}
- Mục đích: cập nhật Email Template.
- Request: các field được phép sửa như `subject`, `bodyHtml`, `isActive`.
- Response: Email Template sau khi cập nhật.

### DELETE /api/v1/email-templates/{templateId}
- Mục đích: xóa mềm Email Template.
- Request: path variable `templateId`.
- Response: kết quả xóa mềm.

## Validation
- `templateName` và `subject` không được rỗng.
- `bodyHtml` phải hợp lệ và không chứa biến ngoài danh sách cho phép.
- Không cho xóa template đang được round/job sử dụng nếu chưa có fallback hợp lệ.

## State Transition
- Không đổi trạng thái Company/User/Job/Application.

## Side Effects
- Ghi audit log khi tạo, cập nhật hoặc xóa template.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc biến nội suy sai.
- 401: chưa đăng nhập.
- 403: không có quyền quản lý Email Template.
- 404: không tìm thấy template trong company hiện tại.
- 409: template đang được sử dụng và không thể xóa.

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
