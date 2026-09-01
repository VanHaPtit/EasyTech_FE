# Task BE API: API Get Rounds

## Mục đích
Cung cấp API backend phục vụ US-11 - Cấu hình Pipeline với contract rõ ràng và validate tại server.

## User Story liên quan
- US-11 - Cau Hinh Pipeline.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `GET`

## Endpoint
- `/api/v1/jobs/{jobId}/rounds`

## Request
- Path variable `jobId`.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Danh sách hiring rounds của job.
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

**Endpoint:** `GET /api/v1/jobs/{jobId}/rounds`
**Mô tả:** Lấy danh sách vòng tuyển dụng/pipeline rounds của job thuộc company hiện tại.

### Request Body
Không có request body.

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy danh sách vòng tuyển dụng thành công",
  "data": {
    "items": [
      {
        "id": 201,
        "name": "CV Screening",
        "order": 1,
        "type": "CV_SCREENING",
        "isRequired": true,
        "createdAt": "2026-08-31T10:00:00"
      }
    ],
    "total": 1
  }
}
```

