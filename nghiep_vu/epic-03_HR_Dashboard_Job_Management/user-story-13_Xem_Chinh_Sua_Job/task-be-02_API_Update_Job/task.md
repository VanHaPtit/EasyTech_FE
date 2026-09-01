# Task BE API: API Update Job

## Mục đích
Cung cấp API backend phục vụ US-13 - Xem và chỉnh sửa Job với contract rõ ràng và validate tại server.

## User Story liên quan
- US-13 - Xem Chinh Sua Job.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `PATCH`

## Endpoint
- `/api/v1/jobs/{jobId}`

## Request
- Các field job được phép chỉnh sửa.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Job sau khi cập nhật.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không tự publish; giữ nguyên Job Status nếu request không yêu cầu state change hợp lệ.

## Side Effects
- Ghi audit log nếu task tạo/cập nhật/xóa dữ liệu nghiệp vụ.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract

**Endpoint:** `PATCH /api/v1/jobs/{jobId}`
**Mô tả:** Cập nhật các field được phép chỉnh sửa của job thuộc company hiện tại.

### Request Body
```json
{
  "title": "Senior Frontend Developer",
  "description": "JD details updated...",
  "requirements": "ReactJS, TypeScript",
  "salaryMin": 1800,
  "salaryMax": 2800,
  "currency": "USD",
  "workingType": "HYBRID",
  "employmentType": "FULL_TIME",
  "experienceLevel": "SENIOR"
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Cập nhật job thành công",
  "data": {
    "id": 101,
    "title": "Senior Frontend Developer",
    "slug": "senior-frontend-developer",
    "status": "DRAFT",
    "updatedAt": "2026-08-31T10:30:00"
  }
}
```

