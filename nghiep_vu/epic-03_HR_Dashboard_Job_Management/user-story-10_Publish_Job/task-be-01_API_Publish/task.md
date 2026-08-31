# Task BE API: API Publish

## Mục đích
Cung cấp API backend phục vụ US-10 - Publish Job với contract rõ ràng và validate tại server.

## User Story liên quan
- US-10 - Publish Job.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/jobs/{jobId}/publish`

## Request
- Path variable `jobId`; không cần body nếu publish theo cấu hình hiện tại.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Job sau khi publish.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Job Status: DRAFT -> ACTIVE.

## Side Effects
- Public job trên Career Site và ghi audit log.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract
**Endpoint:** `POST /api/v1/jobs/{job_id}/publish`
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
    "published_at": "2026-08-31T10:00:00Z"
  }
}
```

