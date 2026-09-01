# task-be-05_API_xoa_vong

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-05 API xoa vong.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: API Delete Round

## Mục đích
Cung cấp API backend phục vụ US-16 - Cấu hình Pipeline với contract rõ ràng và validate tại server.

## User Story liên quan
- US-16 - Cau Hinh Pipeline.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `DELETE`

## Endpoint
- `/api/v1/jobs/{jobId}/rounds/{roundId}`

## Request
- Path variables `jobId`, `roundId`.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Kết quả xóa mềm round.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không có state transition trực tiếp.

## Side Effects
- Không được làm mất lịch sử ứng viên đã đi qua round.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract

**Endpoint:** `DELETE /api/v1/jobs/{jobId}/rounds/{roundId}`
**Mô tả:** Xóa mềm vòng tuyển dụng nếu vòng chưa có dữ liệu ràng buộc không cho phép xóa.

### Request Body
Không có request body.

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Xóa vòng tuyển dụng thành công",
  "data": {
    "id": 202,
    "deleted": true
  }
}
```

