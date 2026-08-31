# Task BE API: API App Detail

## Mục đích
Cung cấp API backend phục vụ US-16 - Candidate Drawer với contract rõ ràng và validate tại server.

## User Story liên quan
- US-16 - Candidate Drawer.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `GET`

## Endpoint
- `/api/v1/applications/{applicationId}`

## Request
- Path variable `applicationId`.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Chi tiết candidate, CV, timeline, round result và email history.
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

**Endpoint:** `GET /api/v1/applications/{applicationId}`
**Mô tả:** Lấy chi tiết application/candidate để hiển thị Candidate Drawer.

### Request Body
Không có request body.

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy chi tiết hồ sơ ứng viên thành công",
  "data": {
    "id": 301,
    "status": "ACTIVE",
    "appliedAt": "2026-08-31T10:00:00",
    "candidate": {
      "id": 501,
      "fullName": "Tran B",
      "email": "tranb@example.com",
      "phone": "0901234567",
      "cvUrl": "https://storage.easytech.vn/cv/tran-b.pdf"
    },
    "job": {
      "id": 101,
      "title": "Senior Frontend Developer"
    },
    "currentRound": {
      "id": 201,
      "name": "CV Screening",
      "result": "IN_PROGRESS"
    },
    "timeline": [
      {
        "type": "APPLIED",
        "title": "Ứng viên đã nộp hồ sơ",
        "createdAt": "2026-08-31T10:00:00"
      }
    ],
    "emailHistory": []
  }
}
```

