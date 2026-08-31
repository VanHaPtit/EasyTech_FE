# Task BE API: API Approve

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
- `status = ACTIVE` và ghi chú duyệt nếu có.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Company detail sau khi duyệt.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Company = ACTIVE, User = ACTIVE.

## Side Effects
- Gửi email approve, tạo Career Site mặc định, ghi audit log.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract
**Endpoint:** `POST /api/v1/admin/companies/{company_id}/approve`
### Request Body
```json
{}
```
### Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "status": "ACTIVE",
    "approved_at": "2026-08-31T10:00:00Z"
  }
}
```

