# Task BE API: API Block

## Mục đích
Cung cấp API backend phục vụ US-05 - Admin duyệt doanh nghiệp với contract rõ ràng và validate tại server.

## User Story liên quan
- US-05 - Admin Duyet Doanh Nghiep.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `PATCH`

## Endpoint
- `/api/v1/admin/companies/{companyId}/status`

## Request
- `status = BLOCKED` hoặc trạng thái khóa tương ứng nếu domain bật tính năng này.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Company detail sau khi khóa/mở khóa.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Tài khoản liên quan bị hạn chế truy cập theo chính sách admin.

## Side Effects
- Ghi audit log và ngắt quyền truy cập workspace.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract

**Endpoint:** `PATCH /api/v1/admin/companies/{companyId}/status`
**Mô tả:** Khóa doanh nghiệp theo quyền System Admin.

### Request Body
```json
{
  "status": "BLOCKED"
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Khóa doanh nghiệp thành công",
  "data": {
    "id": 1,
    "status": "BLOCKED"
  }
}
```

