# 📋 User Story 12: Email Automation (Tự Động Hóa Gửi Email)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want** hệ thống tự động gửi các email chuẩn hóa đến ứng viên khi có sự thay đổi trạng thái (chuyển vòng, pass/fail),
- **So that** tôi không phải viết email thủ công, đảm bảo ứng viên luôn được thông báo kịp thời, tăng trải nghiệm ứng viên (Candidate Experience).
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Kích hoạt email tự động khi chuyển vòng**
  - **GIVEN** HR đã cấu hình `hiring_rounds` cho Job, và mỗi vòng có gắn một Email Template cụ thể.
  - **WHEN** HR kéo-thả ứng viên sang vòng tiếp theo trên Kanban Board.
  - **THEN** Background Job của hệ thống được kích hoạt:
    - Lấy thông tin Email Template tương ứng.
    - Parse các biến nội suy (variables) như `{{candidate_name}}`, `{{job_title}}`, `{{company_name}}` thành dữ liệu thực tế.
    - Gọi dịch vụ SMTP (qua Mailtrap/SendGrid) để gửi email đến địa chỉ của ứng viên.
    - Lưu một bản ghi vào bảng `email_logs`.

- **Scenario 2: Tự động gửi email khi nhận đơn ứng tuyển mới (Auto-reply)**
  - **GIVEN** Job có cấu hình tự động trả lời khi nhận đơn (ví dụ: Template "Xác nhận nhận đơn").
  - **WHEN** ứng viên nộp CV thành công qua Career Site.
  - **THEN** hệ thống tự động gửi email "Xác nhận đã nhận hồ sơ" đến ứng viên, bao gồm Magic Link để họ tự tra cứu.

- **Scenario 3: Tự động gửi email thông báo trượt (Reject)**
  - **GIVEN** HR đánh dấu ứng viên là `REJECTED` ở một vòng bất kỳ.
  - **WHEN** thao tác được lưu thành công.
  - **THEN** hệ thống tự động gửi email từ chối khéo léo (Template "Thư cảm ơn / Rejection") cho ứng viên.

- **Scenario 4: Xử lý lỗi khi gửi email**
  - **GIVEN** SMTP server bị lỗi hoặc email ứng viên sai định dạng.
  - **WHEN** hệ thống cố gắng gửi email tự động.
  - **THEN** nếu lỗi mạng/server: Background Job sẽ thử lại (retry) tối đa 3 lần.
  - Nếu vẫn thất bại: bản ghi trong `email_logs` sẽ có `status = FAILED`, HR có thể thấy trên giao diện và thao tác gửi lại sau.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** cho phép ứng viên reply (trả lời) trực tiếp vào email hệ thống và nhận vào inbox của phần mềm (hỗ trợ 1-way email, reply-to sẽ trỏ về email công ty).
- **KHÔNG** cho phép HR custom email nội dung (viết tay hoàn toàn) trong lúc kéo thả – nó phải dùng Template định sẵn.
