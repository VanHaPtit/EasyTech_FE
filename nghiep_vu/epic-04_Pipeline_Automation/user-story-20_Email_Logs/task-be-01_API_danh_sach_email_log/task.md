# task-be-01_API_danh_sach_email_log

## Mục đích
Xác định phạm vi backend cho task 'API danh sach email log' trong US-20 Email Logs, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.

## Endpoint hiện hành
- `GET /api/v1/email-logs`
- Role: `HR` hoặc `HR_ADMIN`; dữ liệu luôn giới hạn theo `company_id` của người dùng đăng nhập.
- Query params pagination dùng chung backend: `page` (mặc định 1), `limit` (mặc định 10), ngoài ra có `status` (`SUCCESS|FAILED`) và `templateCode`.

## API JSON Contract

### Response (200 OK)
```json
{
  "status": 1,
  "message": "success",
  "data": {
    "data": [
      {
        "id": 9001,
        "applicationId": 1201,
        "recipientEmail": "candidate@example.com",
        "templateCode": "APPLICATION_RECEIVED",
        "status": "SUCCESS",
        "subject": "Thư mời phỏng vấn",
        "bodyHtml": "<p>Nội dung email...</p>",
        "sentAt": "2026-08-31T10:00:00",
        "retriedAt": null,
        "errorMessage": null,
        "attemptCount": 1,
        "createdAt": "2026-08-31T10:00:00"
      }
    ],
    "current_page": 1,
    "last_page": 1,
    "total": 1
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Không có quyền xem lịch sử email.",
  "data": null
}
```

---

## Thiết kế Database – Bảng `email_logs`

## Bảng/entity liên quan
- Bảng chính: `email_logs`; liên kết tùy chọn với `applications` và bắt buộc với `companies`.
- `id`, `company_id`, `application_id` và các ID liên quan dùng `BIGINT` ở PostgreSQL, tương ứng `Long` trong Java/JSON number.
- Bảng lưu `created_at`, `updated_at`, `sent_at`, `retried_at`; không dùng `is_deleted` vì log là dữ liệu truy vết.
- Có index theo `company_id`, `status`, `created_at` và `application_id`.

## Column và kiểu dữ liệu
- Dùng `BIGINT/BIGSERIAL` cho khóa chính/khóa ngoại.
- Dùng `VARCHAR` cho mã, email, enum dạng text.
- Dùng `TEXT` cho nội dung email và thông báo lỗi.
- Dùng `TIMESTAMP` cho thời điểm tạo/cập nhật/gửi email/ retry.
- Enum/status của log: `SUCCESS` hoặc `FAILED`.

## Khóa và ràng buộc
- Primary Key: `id`.
- Foreign Key: `company_id` trỏ `companies(id)` với `ON DELETE RESTRICT`; `application_id` trỏ `applications(id)` với `ON DELETE SET NULL`.
- Constraint bắt buộc cho recipient, template code, subject, body, status và attempt_count.

## Migration
- Migration hiện hành: `V20__create_email_logs.sql`.
- Có giá trị mặc định rõ ràng cho status và attempt_count.

## Relationship
- Dữ liệu phải giữ đúng multi-tenant boundary theo `company_id`.
- Log không bị xóa mềm theo nghiệp vụ hiện tại; giữ lại để truy vết gửi email.
