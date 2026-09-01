# task-be-03_khoi_tao_tai_khoan_admin

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-03 khoi tao tai khoan admin.

## Mô tả chức năng chi tiết
Cấu hình file Database Seeder (chạy lệnh migration/seed). Script này sẽ tự động mã hóa (hash) một mật khẩu mặc định (từ biến môi trường ENV) và insert một bản ghi Admin vào DB với quyền cao nhất, đảm bảo hệ thống có ít nhất một tài khoản để hoạt động khi vừa deploy.

## Bảng/entity liên quan
- Bảng chính: `users`, `companies`, `company_profiles`, `refresh_tokens`.
- Mỗi bảng phải có id làm Primary Key, created_at, updated_at và is_deleted nếu cần xóa mềm.
- Các bảng thuộc tenant phải có company_id và index theo company_id.

## Column và kiểu dữ liệu
- Dùng UUID cho khóa chính/khóa ngoại.
- Dùng VARCHAR cho mã, email, slug, enum dạng text.
- Dùng TEXT cho nội dung dài như mô tả, lý do từ chối, email body hoặc AI explanation.
- Dùng TIMESTAMP cho thời điểm tạo/cập nhật/gửi email/đánh giá.
- - Enum/status liên quan: Company Status = `PENDING`/`ACTIVE`/`REJECTED`; User Status = `PENDING`/`ACTIVE`/`INACTIVE`/`BLOCKED`.

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
