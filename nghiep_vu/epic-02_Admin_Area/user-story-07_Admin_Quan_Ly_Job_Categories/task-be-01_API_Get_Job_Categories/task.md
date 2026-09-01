# Task BE API: Lấy danh sách Job Categories

## Mục đích
Cung cấp API backend phục vụ US-30 - Admin xem danh sách danh mục ngành nghề.

## Điều kiện tiên quyết
- User phải có quyền Admin (`role = ADMIN`).
- Trả về tất cả các danh mục (bao gồm cả ACTIVE và INACTIVE) ngoại trừ những danh mục đã bị xóa mềm (`is_deleted = true`).

## HTTP Method
- `GET`

## Endpoint
- `/api/v1/admin/job-categories`

## Request
- Query parameters (Tùy chọn): `page`, `size`, `search` (theo tên danh mục).

## Response
- Thành công: `BaseResponse(status = 1, message, data)` chứa mảng các categories, bao gồm `id`, `name`, `slug`, `status`, `jobCount` (số lượng job đang dùng category này), `createdAt`.

## API JSON Contract
```json
{
  "status": 1,
  "message": "Success",
  "data": {
    "content": [
      {
        "id": 1,
        "name": "Công nghệ thông tin",
        "slug": "cong-nghe-thong-tin",
        "status": "ACTIVE",
        "jobCount": 15,
        "createdAt": "2026-08-31T10:00:00"
      }
    ],
    "totalElements": 1,
    "totalPages": 1
  }
}
```
