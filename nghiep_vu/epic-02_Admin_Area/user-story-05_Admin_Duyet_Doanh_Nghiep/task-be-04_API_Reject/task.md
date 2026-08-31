# Task BE API: API Reject

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
- `status = REJECTED`, `reason` bắt buộc và đủ rõ.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Company detail sau khi reject.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Company = REJECTED, User = PENDING.

## Side Effects
- Gửi email reject kèm lý do và ghi audit log.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract

**Endpoint:** `GET /api/v1/resource/04_api_reject`
**Mô tả:** Đặc tả API cho thao tác task-be-04_API_Reject (Auto-generated fallback).

### Request Body
```json
{
  "example_field": "string_value"
}
```

### Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "message": "Operation successful"
  }
}
```

