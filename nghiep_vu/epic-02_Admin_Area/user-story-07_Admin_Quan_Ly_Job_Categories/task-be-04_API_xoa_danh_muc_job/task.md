# task-be-04_API_xoa_danh_muc_job

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-04 API xoa danh muc job.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Xóa Job Category

## Mục đích
Cung cấp API backend phục vụ US-07 - Admin xóa (soft delete) danh mục ngành nghề.

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
