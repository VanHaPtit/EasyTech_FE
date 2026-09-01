# task-be-03_API_sua_danh_muc_job

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-03 API sua danh muc job.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Cập nhật Job Category

## Mục đích
Cung cấp API backend phục vụ US-07 - Admin sửa tên hoặc bật/tắt (toggle status) danh mục ngành nghề.

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
