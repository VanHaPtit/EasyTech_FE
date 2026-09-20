# task-be-03_API_tao_vong

## Mục đích
Xác định phạm vi backend cho task 'API tao vong' trong US-16 Cau Hinh Pipeline, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-16 - Cau Hinh Pipeline.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User có role `HR` hoặc `HR_ADMIN`.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.
- Backend re-check user thuộc company hiện tại và user/company đều `ACTIVE`; không tin riêng vào company ID trong token.
- Job không bị xóa và không ở trạng thái `CLOSED`.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/jobs/{jobId}/rounds`

## Request
- `name` bắt buộc, tối đa 255 ký tự.
- `description`, `passEmailTemplateId`, `failEmailTemplateId`, `testLink` và `isFinalRound` là tùy chọn.
- Backend tự gán `orderIndex` ở cuối danh sách; client không truyền thứ tự trong API tạo vòng.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: HTTP `200`, BaseResponse(status = 1, message, data); Round vừa tạo.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không có state transition trực tiếp.

## Side Effects
- Cập nhật pipeline config của job.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.

Thành công ghi audit log `CREATE_HIRING_ROUND`; `passEmailTemplateId`/`failEmailTemplateId` là `Long` nullable và không được nhận ID mock từ frontend.


## 3. API JSON Contract
**Endpoint:** `POST /api/v1/jobs/{jobId}/rounds`
### Request Body
```json
{
  "name": "HR Interview",
  "description": "Phỏng vấn với HR",
  "passEmailTemplateId": 301,
  "failEmailTemplateId": 302,
  "testLink": null,
  "isFinalRound": false
}
```
### Response (200 OK)
```json
{
  "status": 1,
  "message": "Tạo vòng tuyển dụng thành công",
  "data": {
    "id": 202,
    "name": "HR Interview",
    "description": "Phỏng vấn với HR",
    "orderIndex": 1,
    "passEmailTemplateId": 301,
    "failEmailTemplateId": 302,
    "testLink": null,
    "isFinalRound": false,
    "createdAt": "2026-08-31T10:00:00",
    "updatedAt": "2026-08-31T10:00:00"
  }
}
```

---

## Thiết kế Database – Bảng `hiring_rounds`

## Bảng/entity liên quan
- Bảng chính của US-16: `hiring_rounds`.
- `hiring_rounds` liên kết với `jobs` và `companies`; các bảng email template, evaluation và interview là scope của US khác.
- Bảng có `id`, `company_id`, `job_id`, `created_at`, `updated_at` và `is_deleted`.
- Index hiện tại: `hiring_rounds(job_id, is_deleted, order_index)`.

## Column và kiểu dữ liệu
- Dùng `BIGINT` cho khóa chính/khóa ngoại, tương ứng `Long` trong backend.
- Các cột chính: `name VARCHAR(255)`, `description TEXT`, `order_index INT`, `pass_email_template_id BIGINT`, `fail_email_template_id BIGINT`, `test_link TEXT`, `is_final_round BOOLEAN`, `is_deleted BOOLEAN`.
- Dùng `TIMESTAMP` cho `created_at` và `updated_at`.
- US-16 hiện không có cột `type`, `is_required` hoặc bảng `round_statuses` trong schema triển khai.

## Khóa và ràng buộc
- Primary Key: id.
- Foreign Key: `company_id` trỏ `companies.id`, `job_id` trỏ `jobs.id`.
- `company_id` trong round phải trùng company của Job; service kiểm tra ownership trước mọi thao tác.
- Round đã xóa mềm không được xuất hiện trong danh sách hoặc được nhận trong request reorder.

## Migration
- Tạo migration idempotent theo thứ tự triển khai.
- Có giá trị mặc định rõ ràng cho status và boolean flag.

## Relationship
- Dữ liệu phải giữ đúng multi-tenant boundary theo company_id.
- Xóa mềm không được làm mất dữ liệu round cần phục vụ truy vết; round có ứng viên đang ở đó không được xóa.
- `jobs.round_count` được đồng bộ sau thao tác tạo/xóa và khi lưu pipeline tổng hợp.
