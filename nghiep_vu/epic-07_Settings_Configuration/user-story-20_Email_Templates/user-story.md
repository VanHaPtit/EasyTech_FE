# 📋 User Story 20: Cấu Hình Mẫu Email (Email Templates Management)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** quản lý các mẫu thư (Email Templates) để sử dụng cho việc gửi tự động hoặc thủ công cho ứng viên,
- **So that** tôi có thể thống nhất thông điệp giao tiếp, giữ văn phong chuyên nghiệp và tiết kiệm thời gian soạn lại nội dung mỗi lần gửi.
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR xem danh sách Template mặc định**
  - **GIVEN** tài khoản công ty mới được kích hoạt.
  - **WHEN** HR truy cập `/dashboard/settings/email-templates`.
  - **THEN** hệ thống tự động sinh ra (seed) một bộ template mặc định không thể xóa (ví dụ: Xác nhận nhận đơn, Mời phỏng vấn, Từ chối).
  - HR có thể xem danh sách các template này, phân loại theo mục đích (System/Custom).

- **Scenario 2: HR tạo mới một Email Template tùy chỉnh**
  - **GIVEN** HR đang ở trang quản lý Email Templates.
  - **WHEN** HR nhấn "Tạo mẫu mới", điền Tên mẫu, Tiêu đề (Subject) và dùng Rich Text Editor để soạn Nội dung (Body).
  - **THEN** hệ thống lưu template vào `email_templates` liên kết với `company_id`.
  - Template này ngay lập tức xuất hiện trong danh sách dropdown khi HR cần gửi email thủ công hoặc cấu hình Pipeline.

- **Scenario 3: Sử dụng biến nội suy (Variables) trong Template**
  - **GIVEN** HR đang soạn thảo nội dung template.
  - **WHEN** HR chèn các biến như `{{candidate_name}}`, `{{job_title}}`, `{{company_name}}` từ danh sách gợi ý.
  - **THEN** hệ thống cho phép chèn biến.
  - (Luồng gửi email - Story 12 sẽ xử lý bước thay thế biến này thành text thật).

- **Scenario 4: HR sửa/xóa Template**
  - **GIVEN** một Custom Template do HR tạo ra.
  - **WHEN** HR sửa hoặc xóa template này.
  - **THEN** nội dung sửa đổi được cập nhật ngay lập tức cho các lần gửi tương lai.
  - Không cho phép xóa System Template mặc định của hệ thống, chỉ cho phép chỉnh sửa nội dung.

- **Scenario 5: Chế độ xem trước (Preview)**
  - **GIVEN** HR đang soạn hoặc sửa một template.
  - **WHEN** HR nhấn nút "Xem trước".
  - **THEN** hệ thống hiển thị popup mockup giống một cửa sổ ứng dụng email (Gmail-like), các biến như `{{candidate_name}}` được hiển thị giả lập (ví dụ: "Nguyễn Văn A") để HR dễ hình dung.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ đính kèm file (Attachments) vào Email Template mặc định (để tránh giới hạn dung lượng SMTP và rủi ro spam).
- **KHÔNG** hỗ trợ tùy chỉnh HTML code raw thuần túy (để bảo vệ layout chung của hệ thống, chỉ cho dùng công cụ định dạng Rich Text).
