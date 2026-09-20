# task-be-06_API_sap_xep_vong

## Mục đích
Xác định phạm vi backend cho task 'API sap xep vong' trong US-16 Cau Hinh Pipeline, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

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
- `PUT`

## Endpoint
- `/api/v1/jobs/{jobId}/rounds/reorder`

## Request
- Body có field `orderedIds` là mảng `Long`/`BIGINT` ID theo thứ tự mới.
- Mảng phải chứa đầy đủ mỗi round đang hiệu lực đúng một lần; không được bỏ sót, trùng lặp hoặc gửi round đã xóa mềm.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Danh sách rounds sau reorder.
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

Thành công ghi audit log `REORDER_HIRING_ROUNDS`; `orderedIds` là các ID `Long`/`BIGINT` của toàn bộ round đang hiệu lực, mỗi ID đúng một lần.


## 3. API JSON Contract

**Endpoint:** `PUT /api/v1/jobs/{jobId}/rounds/reorder`
**Mô tả:** Cập nhật thứ tự các vòng tuyển dụng của job.

### Request Body
```json
{
  "orderedIds": [202, 201]
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Cập nhật thứ tự vòng tuyển dụng thành công",
  "data": [
    { "id": 202, "name": "Technical Interview", "orderIndex": 0 },
    { "id": 201, "name": "CV Screening", "orderIndex": 1 }
  ]
}
```
