# Task BE API: Thêm mới Job Category

## Mục đích
Cung cấp API backend phục vụ US-07 - Admin tạo mới danh mục ngành nghề.

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
