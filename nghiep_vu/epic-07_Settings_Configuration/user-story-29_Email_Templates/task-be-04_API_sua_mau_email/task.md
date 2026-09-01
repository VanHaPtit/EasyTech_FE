# task-be-04_API_sua_mau_email

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-04 API sua mau email.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.



## User Story liên quan
- US-29 - Email Templates.

## Điều kiện tiên quyết
- User đã đăng nhập và có quyền quản lý Email Template.
- Backend kiểm tra ownership theo `company_id`.
- Template phải tồn tại trong company hiện tại.
- Template phải dùng đúng danh sách biến nội suy được hỗ trợ.

## API contract

### PATCH /api/v1/email-templates/{templateId}
- Mục đích: cập nhật Email Template.
- Request: các field được phép sửa như `subject`, `bodyHtml`, `isActive`.
- Response: Email Template sau khi cập nhật.

## Validation
- Không cho phép cập nhật nếu biến `bodyHtml` chứa biến ngoài danh sách cho phép.
- Validate định dạng dữ liệu truyền lên.

## State Transition
- Không đổi trạng thái Company/User/Job/Application.

## Side Effects
- Ghi audit log khi cập nhật template.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc biến nội suy sai.
- 401: chưa đăng nhập.
- 403: không có quyền quản lý Email Template.
- 404: không tìm thấy template trong company hiện tại.

## 3. API JSON Contract
**Endpoint:** `PATCH /api/v1/email-templates/{templateId}`

### Request Body
```json
{
  "subject": "Thông báo từ {{companyName}} - Chúc mừng {{candidateName}}",
  "bodyHtml": "<p>Xin chào {{candidateName}}, chúc mừng bạn đã xuất sắc vượt qua vòng phỏng vấn!</p>",
  "isActive": true
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Cập nhật Email Template thành công",
  "data": {
    "id": 501,
    "templateName": "Default Pass Template",
    "type": "PASS",
    "subject": "Thông báo từ {{companyName}} - Chúc mừng {{candidateName}}",
    "bodyHtml": "<p>Xin chào {{candidateName}}, chúc mừng bạn đã xuất sắc vượt qua vòng phỏng vấn!</p>",
    "variables": [
      "candidateName",
      "jobTitle",
      "companyName"
    ],
    "isActive": true,
    "updatedAt": "2026-08-31T10:30:00"
  }
}
```
