# task-be-04_API_xoa_danh_muc_job

## Mục đích
Xác định phạm vi backend cho task 'API xoa danh muc job' trong US-07 Admin Quan Ly Job Categories, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Điều kiện tiên quyết
- User phải có quyền Admin (`role = ADMIN`).

## HTTP Method
- `DELETE`

## Endpoint
- `/api/v1/admin/job-categories/{id}`

## Request
- Path variable: `id`.

## Validation
- Kiểm tra danh mục có tồn tại hay không.
- **Rất quan trọng:** Kiểm tra bảng `jobs` xem có job nào đang tham chiếu tới `category_id` này không. Nếu `jobCount > 0`, bắt buộc chặn lại và trả về lỗi 409 Conflict.
- Cập nhật cờ `is_deleted = true`.

## Response
- Thành công: Xóa thành công (thường trả về message).
- Thất bại: Báo lỗi đang có job sử dụng.

## API JSON Contract
### Response (Thành công)
```json
{
  "status": 1,
  "message": "Đã xóa danh mục thành công",
  "data": null
}
```

### Response (Lỗi)
```json
{
  "status": 0,
  "message": "Không thể xóa danh mục đang có Job sử dụng.",
  "data": null
}
```
