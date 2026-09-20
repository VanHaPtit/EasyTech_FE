# task-be-01_API_danh_sach_danh_muc_job

## Mục đích
Xác định phạm vi backend cho task 'API danh sach danh muc job' trong US-07 Admin Quan Ly Job Categories, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Điều kiện tiên quyết
- User phải có quyền Admin (`role = ADMIN`).
- Trả về tất cả các danh mục (bao gồm cả ACTIVE và INACTIVE) ngoại trừ những danh mục đã bị xóa mềm (`is_deleted = true`).

## HTTP Method
- `GET`

## Endpoint
- `/api/v1/admin/job-categories`

## Request
- Query parameters (Tùy chọn): `page`, `limit`, `search` (theo tên danh mục).
- `page` bắt đầu từ `1`; `limit` là số bản ghi mỗi trang và mặc định theo controller/backend hiện tại.

## Response
- Thành công: `BaseResponse(status = 1, message, data)` chứa mảng các categories, bao gồm `id` (`BIGINT`/JSON number), `name`, `slug`, `sortOrder`, `status`, `jobCount` (chỉ đếm Job có `is_deleted = false`) và `createdAt`.

## API JSON Contract
```json
{
  "status": 1,
  "message": "Lấy danh sách danh mục ngành nghề thành công.",
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "name": "Công nghệ thông tin",
        "slug": "cong-nghe-thong-tin",
        "sortOrder": 0,
        "status": "ACTIVE",
        "jobCount": 15,
        "createdAt": "2026-08-31T10:00:00"
      }
    ],
    "last_page": 1,
    "total": 1
  }
}
```

## API sắp xếp danh mục

- `PUT /api/v1/admin/job-categories/reorder`
- Request body:

```json
{
  "orderedIds": [3, 1, 2]
}
```

- `orderedIds` dùng ID kiểu `BIGINT` và phải chứa đầy đủ, không trùng lặp tất cả danh mục có `is_deleted = false`, bao gồm cả danh mục `INACTIVE`.
- Backend cập nhật `sort_order` theo chỉ số từ `0` và trả về danh sách đã sắp xếp.
- Danh mục đã xóa mềm không được đưa vào request; request thiếu/thừa/trùng ID trả về `400`.
- Thao tác được ghi vào `audit_logs` với `target_type = JOB_CATEGORY`.

---

## Thiết kế Database – Bảng job_categories

## Bảng/entity liên quan
- Bảng chính của task: `job_categories`; bảng tham chiếu để tính `jobCount`: `jobs`.
- `job_categories` là catalog dùng chung toàn hệ thống, không có `company_id`.
- Migration `V11__create_job_categories_and_category_fk.sql` tạo bảng với `status` và `is_deleted` theo database convention.
- Mỗi bản ghi có `id`, `created_at`, `updated_at` và `is_deleted`.

## Column và kiểu dữ liệu
- Dùng `BIGINT` cho khóa chính và khóa tham chiếu, phù hợp với schema/migration hiện tại; JSON trả về ID dạng number.
- Các cột chính của `job_categories`: `name VARCHAR(255) NOT NULL`, `slug VARCHAR(255) UNIQUE NOT NULL`, `sort_order INT DEFAULT 0`, `status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'`, `is_deleted BOOLEAN NOT NULL DEFAULT FALSE`.
- `status` chỉ nhận `ACTIVE` hoặc `INACTIVE`; không tạo cột `is_active`.
- Dùng `TIMESTAMP` cho thời điểm tạo/cập nhật.

## Khóa và ràng buộc
- Primary Key: id.
- Foreign Key: trỏ đúng entity cha, đặc biệt company_id, job_id, pplication_id, 
ound_id, user_id.
- Constraint bắt buộc cho field nghiệp vụ chính; không cho dữ liệu mồ côi giữa company, job, application và round.
- Unique index cho các mã định danh như email, tax code, slug hoặc template key theo phạm vi tenant nếu nghiệp vụ yêu cầu.

## Migration
- Tạo migration idempotent theo thứ tự triển khai.
- Có giá trị mặc định rõ ràng: `status = 'ACTIVE'`, `sort_order = 0`, `is_deleted = false`.
- V11 tạo FK `jobs.category_id -> job_categories.id`; PostgreSQL sẽ kiểm tra toàn bộ dữ liệu hiện có khi thêm FK và fail-fast nếu còn `jobs.category_id` không có category tương ứng, không tự đổi hoặc xóa liên kết.
- Không sửa checksum của migration đã chạy. Với database đã áp dụng V11, V16 thực hiện kiểm tra orphan tương thích trước khi đánh dấu schema đã đồng bộ; nếu phát hiện dữ liệu mồ côi thì migration fail-fast để yêu cầu xử lý dữ liệu.

## Relationship
- `jobs.category_id` là khóa ngoại nullable tới `job_categories.id` với `ON DELETE SET NULL`.
- `job_categories` là catalog cấp hệ thống, không có `company_id`; `jobCount` dùng query trên `jobs.category_id` với điều kiện `jobs.is_deleted = false`.
- Xóa mềm không được làm mất audit/history cần phục vụ báo cáo hoặc truy vết.
