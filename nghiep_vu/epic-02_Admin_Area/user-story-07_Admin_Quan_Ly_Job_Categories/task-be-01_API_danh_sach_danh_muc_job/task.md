# task-be-01_API_danh_sach_danh_muc_job

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-01 API danh sach danh muc job.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Lấy danh sách Job Categories

## Mục đích
Cung cấp API backend phục vụ US-07 - Admin xem danh sách danh mục ngành nghề.

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
  "message": "Lấy danh sách danh mục ngành nghề thành công.",
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

---

## Thiết kế Database – Bảng job_categories

## Bảng/entity liên quan
- Bảng chính: `companies`, `company_profiles`, `users`, `audit_logs`, `job_categories`.
- Mỗi bảng phải có id làm Primary Key, created_at, updated_at và is_deleted nếu cần xóa mềm.
- Các bảng thuộc tenant phải có company_id và index theo company_id.

## Column và kiểu dữ liệu
- Dùng UUID cho khóa chính/khóa ngoại.
- Dùng VARCHAR cho mã, email, slug, enum dạng text.
- Dùng TEXT cho nội dung dài như mô tả, lý do từ chối, email body hoặc AI explanation.
- Dùng TIMESTAMP cho thời điểm tạo/cập nhật/gửi email/đánh giá.
- - Enum/status liên quan: Job Status = `DRAFT`/`ACTIVE`/`CLOSED`.

## Khóa và ràng buộc
- Primary Key: id.
- Foreign Key: trỏ đúng entity cha, đặc biệt company_id, job_id, pplication_id, ound_id, user_id.
- Constraint bắt buộc cho field nghiệp vụ chính; không cho dữ liệu mồ côi giữa company, job, application và round.
- Unique index cho các mã định danh như email, tax code, slug hoặc template key theo phạm vi tenant nếu nghiệp vụ yêu cầu.

## Migration
- Tạo migration idempotent theo thứ tự triển khai.
- Có giá trị mặc định rõ ràng cho status và boolean flag.

## Relationship
- Dữ liệu phải giữ đúng multi-tenant boundary theo company_id.
- Xóa mềm không được làm mất audit/history cần phục vụ báo cáo hoặc truy vết.
