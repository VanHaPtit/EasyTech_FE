# task-be-05_API_xoa_vong

## Mục đích
Xác định phạm vi backend cho task 'API xoa vong' trong US-16 Cau Hinh Pipeline, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-16 - Cau Hinh Pipeline.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User có role `HR` hoặc `HR_ADMIN`.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.
- Backend re-check user thuộc company hiện tại và user/company đều `ACTIVE`; không tin riêng vào company ID trong token.
- Job không bị xóa và không ở trạng thái `CLOSED`.

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
- Thành công: HTTP `200`, BaseResponse(status = 1, message, data = null); round được xóa mềm.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không có state transition trực tiếp.

## Side Effects
- Không được làm mất lịch sử ứng viên đã đi qua round.
- Nếu còn ứng viên có `current_round_id` trỏ tới round, API trả `400` và không thay đổi dữ liệu.
- Nếu xóa thành công, các round còn lại được chuẩn hóa `orderIndex` và `jobs.round_count` được cập nhật.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.

Thông báo lỗi khi còn ứng viên phải là: `Vòng này đang có ứng viên. Bạn cần chuyển họ sang vòng khác trước khi xóa.` Thành công ghi audit log `DELETE_HIRING_ROUND`.


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
  "data": null
}
```
