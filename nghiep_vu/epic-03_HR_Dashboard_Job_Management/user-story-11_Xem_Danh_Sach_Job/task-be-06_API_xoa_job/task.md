# task-be-06_API_xoa_job

## Mục đích
Xác định phạm vi backend cho task 'API xoa job' trong US-11 Xem Danh Sach Job, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-11 - Xem Danh Sách Job (Hành động Xóa).

## Điều kiện tiên quyết
- User đã đăng nhập và có quyền quản lý Job.
- Backend kiểm tra ownership của Job theo `company_id`.

## API contract

### DELETE /api/v1/jobs/{jobId}
- Mục đích: xóa cứng Job và toàn bộ dữ liệu ứng tuyển liên quan.
- Request: path variable `jobId`.
- Response: kết quả xóa thành công.

## Validation
- Kiểm tra Job có tồn tại và thuộc quyền quản lý của HR/Công ty hay không.

## State Transition
- Dữ liệu Job bị xóa hoàn toàn khỏi DB.
- Toàn bộ hồ sơ ứng viên (Application) đang có `job_id = jobId` sẽ bị xóa hoàn toàn khỏi DB.
- File CV tương ứng trên storage (S3/Cloud) phải được xóa vĩnh viễn.

## Side Effects
- Ghi audit log việc xóa Job và số lượng hồ sơ ứng viên bị xóa theo.
- Gọi API/Service để xóa file cứng (Storage Delete).

## Các trường hợp lỗi
- 400: request không hợp lệ.
- 401: chưa đăng nhập.
- 403: không có quyền xóa Job này.
- 404: không tìm thấy Job.

## 3. API JSON Contract
**Endpoint:** `DELETE /api/v1/jobs/{jobId}`

### Request
Không có request body.

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Xóa Job và toàn bộ ứng viên liên quan thành công",
  "data": null
}
```
