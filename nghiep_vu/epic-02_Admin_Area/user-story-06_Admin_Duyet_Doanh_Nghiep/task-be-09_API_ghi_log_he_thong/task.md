# task-be-09_API_ghi_log_he_thong

## Mục đích
Xác định phạm vi backend cho task 'API ghi log he thong' trong US-06 Admin Duyet Doanh Nghiep, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Đầu vào
- Entity hoặc DTO đã được validate từ API/service gọi vào.
- Context tenant gồm company_id, user_id, role và trạng thái truy cập nếu có.
- Cấu hình hệ thống cần thiết như SMTP, AI provider, template hoặc storage.

## Xử lý
- Thực hiện nghiệp vụ chính theo domain hiện tại, không tự thêm feature ngoài phạm vi story.
- Kiểm tra quyền theo workspace authorization, không trộn với authentication.

## Kết quả đầu ra
- Kết quả xử lý dạng object/service result để API layer đóng gói BaseResponse.
- Thông tin lỗi rõ nguyên nhân và hành động user/admin cần làm tiếp.

## Phụ thuộc
- Repository/database liên quan.
- Email/AI/storage/provider config nếu task cần tích hợp ngoài.
- Audit/logging service khi có thay đổi dữ liệu hoặc side effect quan trọng.

## Side Effects
- Gửi email, ghi audit log, lưu file, lưu AI result hoặc dispatch notification nếu nghiệp vụ yêu cầu.
- Không gửi lặp khi retry nếu action đã thành công trước đó.

## Xử lý lỗi
- Log lỗi đủ context nhưng không log secret/token/API key.
- Retry có kiểm soát cho lỗi tạm thời như SMTP/AI provider.
- Trả lỗi nghiệp vụ có thể hiểu được cho API layer.

---

## Thiết kế Database – Bảng audit_logs

## Bảng/entity liên quan
- Bảng chính: `companies`, `company_profiles`, `users`, `audit_logs`, `job_categories`.
- Mỗi bảng phải có id làm Primary Key, created_at, updated_at và is_deleted nếu cần xóa mềm.
- Các bảng thuộc tenant phải có company_id và index theo company_id.

## Column và kiểu dữ liệu
- Dùng UUID cho khóa chính/khóa ngoại.
- Dùng VARCHAR cho mã, email, slug, enum dạng text.
- Dùng TEXT cho nội dung dài như mô tả, lý do từ chối, email body hoặc AI explanation.
- Dùng TIMESTAMP cho thời điểm tạo/cập nhật/gửi email/đánh giá.
- - Enum/status liên quan: Company Status = `PENDING`/`ACTIVE`/`REJECTED`; User Status = `PENDING`/`ACTIVE`/`INACTIVE`/`BLOCKED` khi quản trị tài khoản.

## Khóa và ràng buộc
- Primary Key: id.
- Foreign Key: trỏ đúng entity cha, đặc biệt company_id, job_id, pplication_id, 
ound_id, user_id.
- Constraint bắt buộc cho field nghiệp vụ chính; không cho dữ liệu mồ côi giữa company, job, application và round.
- Unique index cho các mã định danh như email, tax code, slug hoặc template key theo phạm vi tenant nếu nghiệp vụ yêu cầu.

## Migration
- Tạo migration idempotent theo thứ tự triển khai.
- Có giá trị mặc định rõ ràng cho status và boolean flag.

## Relationship
- Dữ liệu phải giữ đúng multi-tenant boundary theo company_id.
- Xóa mềm không được làm mất audit/history cần phục vụ báo cáo hoặc truy vết.
