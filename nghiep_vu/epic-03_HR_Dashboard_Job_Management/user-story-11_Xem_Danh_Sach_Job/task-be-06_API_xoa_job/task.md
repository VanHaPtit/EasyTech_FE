# task-be-06_API_xoa_job

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-06 API xoa job.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.



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
