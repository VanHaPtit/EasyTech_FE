# Task BE API: API Job Public

## Mục đích
Cung cấp API backend phục vụ US-18 - Nộp CV với contract rõ ràng và validate tại server.

## User Story liên quan
- US-18 - Nop CV.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- Endpoint public; Candidate không cần đăng nhập. Backend chỉ trả dữ liệu public hợp lệ theo trạng thái của Job/Career Site.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `GET`

## Endpoint
- `/api/v1/public/jobs/{jobSlug}`

## Request
- Path variable định danh job.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Chi tiết job.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không có state transition trực tiếp.

## Side Effects
- Ghi audit log nếu task tạo/cập nhật/xóa dữ liệu nghiệp vụ.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract

**Endpoint:** `GET /api/v1/resource/01_api_job_public`
**Mô tả:** Đặc tả API cho thao tác task-be-01_API_Job_Public (Auto-generated fallback).

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

