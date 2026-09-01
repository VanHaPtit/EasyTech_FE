# task-be-03_API_sua_danh_muc_job

## Mục đích
Xác định phạm vi backend cho task 'API sua danh muc job' trong US-07 Admin Quan Ly Job Categories, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Điều kiện tiên quyết
- User phải có quyền Admin (`role = ADMIN`).
- Danh mục cần sửa phải tồn tại và chưa bị xóa mềm.

## HTTP Method
- `PUT`

## Endpoint
- `/api/v1/admin/job-categories/{id}`

## Request
- Body: `name` (tùy chọn), `status` (tùy chọn: ACTIVE / INACTIVE).

## Validation
- Nếu đổi `name`, kiểm tra trùng lặp với các danh mục khác. Nếu đổi `name` thì cập nhật lại luôn `slug`.

## Response
- Thành công: Trả về thông tin category đã cập nhật.

## API JSON Contract
### Request
```json
{
  "name": "Tài chính / Kế toán",
  "status": "INACTIVE"
}
```

### Response
```json
{
  "status": 1,
  "message": "Cập nhật danh mục thành công",
  "data": {
    "id": 2,
    "name": "Tài chính / Kế toán",
    "slug": "tai-chinh-ke-toan",
    "status": "INACTIVE",
    "jobCount": 5,
    "createdAt": "2026-08-31T10:00:00"
  }
}
```
