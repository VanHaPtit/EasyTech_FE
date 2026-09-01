# task-be-02_API_tao_danh_muc_job

## Mục đích
Xác định phạm vi backend cho task 'API tao danh muc job' trong US-07 Admin Quan Ly Job Categories, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Điều kiện tiên quyết
- User phải có quyền Admin (`role = ADMIN`).

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/admin/job-categories`

## Request
- Body: `name` (Tên danh mục).

## Validation
- Tên danh mục không được trống, không được trùng lặp với danh mục đã tồn tại trong DB (kể cả đã xóa mềm hoặc chưa xóa).
- Backend tự động sinh `slug` từ `name`.

## Response
- Thành công: `BaseResponse(status = 1, message, data)` trả về thông tin category vừa tạo.
- Thất bại: Lỗi 409 nếu trùng tên.

## API JSON Contract
### Request
```json
{
  "name": "Kế toán / Kiểm toán"
}
```

### Response
```json
{
  "status": 1,
  "message": "Tạo danh mục thành công",
  "data": {
    "id": 2,
    "name": "Kế toán / Kiểm toán",
    "slug": "ke-toan-kiem-toan",
    "status": "ACTIVE",
    "jobCount": 0,
    "createdAt": "2026-08-31T10:00:00"
  }
}
```
