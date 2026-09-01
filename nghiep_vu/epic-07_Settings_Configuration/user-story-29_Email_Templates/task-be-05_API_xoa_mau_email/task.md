# task-be-05_API_xoa_mau_email

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-05 API xoa mau email.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.



## User Story liên quan
- US-29 - Email Templates.

## Điều kiện tiên quyết
- User đã đăng nhập và có quyền quản lý Email Template.
- Backend kiểm tra ownership theo `company_id`.
- Template phải tồn tại trong company hiện tại.

## API contract

### DELETE /api/v1/email-templates/{templateId}
- Mục đích: xóa mềm Email Template.
- Request: path variable `templateId`.
- Response: kết quả xóa mềm.

## Validation
- Không cho xóa template đang được round/job sử dụng nếu chưa có fallback hợp lệ.
- Không cho xóa các "System Template" mặc định (nếu rules quy định).

## State Transition
- Không đổi trạng thái Company/User/Job/Application.

## Side Effects
- Ghi audit log khi xóa template.
- Cập nhật trường `is_deleted = true` trong database (xóa mềm).

## Các trường hợp lỗi
- 400: request không hợp lệ.
- 401: chưa đăng nhập.
- 403: không có quyền quản lý Email Template hoặc cố xóa System Template.
- 404: không tìm thấy template trong company hiện tại.
- 409: template đang được sử dụng và không thể xóa.

## 3. API JSON Contract
**Endpoint:** `DELETE /api/v1/email-templates/{templateId}`

### Request
Không có request body.

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Xóa Email Template thành công",
  "data": null
}
```
