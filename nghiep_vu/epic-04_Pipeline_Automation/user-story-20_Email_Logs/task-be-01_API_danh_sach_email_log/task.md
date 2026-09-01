# task-be-01_API_danh_sach_email_log

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-01 API danh sach email log.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Get Email Logs

## Mục đích
API lấy danh sách lịch sử gửi email (phân trang, lọc theo candidate/status/template).

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.

## Endpoint đề xuất
- GET /api/v1/admin/email-logs

## API JSON Contract

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy danh sách lịch sử email thành công.",
  "data": {
    "content": [
      {
        "id": 9001,
        "recipientEmail": "candidate@example.com",
        "templateCode": "INTERVIEW_INVITATION",
        "status": "SENT",
        "subject": "Thư mời phỏng vấn",
        "sentAt": "2026-08-31T10:00:00",
        "errorMessage": null
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

## Thiết kế Database – Bảng email_logs

## Bảng/entity liên quan
- Bảng chính: `job_rounds`, `round_statuses`, `email_templates`, `email_logs`, `interview_schedules`.
- Mỗi bảng phải có id làm Primary Key, created_at, updated_at và is_deleted nếu cần xóa mềm.
- Các bảng thuộc tenant phải có company_id và index theo company_id.

## Column và kiểu dữ liệu
- Dùng UUID cho khóa chính/khóa ngoại.
- Dùng VARCHAR cho mã, email, slug, enum dạng text.
- Dùng TEXT cho nội dung dài như mô tả, lý do từ chối, email body hoặc AI explanation.
- Dùng TIMESTAMP cho thời điểm tạo/cập nhật/gửi email/đánh giá.
- - Enum/status liên quan: Round Result = `IN_PROGRESS`/`PASSED`/`FAILED`; Application Status = `ACTIVE`/`REJECTED`/`HIRED` nếu task trực tiếp cập nhật hồ sơ.

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
