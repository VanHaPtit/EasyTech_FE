# 📋 User Story 04: Admin Đăng Nhập (System Admin Login)

## 1. MÔ TẢ USER STORY
- **As a** Quản trị viên Hệ thống (System Admin),
- **I want to** đăng nhập vào Admin Dashboard bằng tài khoản Admin riêng biệt,
- **So that** tôi có thể phê duyệt doanh nghiệp mới, quản lý người dùng và giám sát hoạt động toàn hệ thống.
- **Story Points:** 2

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Admin đăng nhập thành công và được redirect đúng dashboard**
  - **GIVEN** tài khoản Admin đã được tạo sẵn trong database với `role = ADMIN`.
  - **WHEN** Admin nhập đúng email và mật khẩu tại trang `/login`.
  - **THEN** hệ thống xác thực credentials và kiểm tra `role`.
  - Vì `role = ADMIN`: hệ thống redirect đến `/admin/dashboard` thay vì `/dashboard`.

- **Scenario 2: Admin không thể truy cập HR Dashboard và ngược lại**
  - **GIVEN** Admin đã đăng nhập thành công.
  - **WHEN** Admin cố truy cập `/dashboard` (HR Dashboard).
  - **THEN** hệ thống chặn và redirect về `/admin/dashboard` với thông báo "Bạn không có quyền truy cập khu vực này."
  - Tương tự: HR không thể truy cập `/admin/*`.

- **Scenario 3: Tài khoản Admin không thể tự đăng ký**
  - **GIVEN** trang đăng ký `/register` công khai.
  - **WHEN** bất kỳ người dùng nào điền form đăng ký.
  - **THEN** hệ thống chỉ tạo tài khoản với `role = HR_ADMIN` (không bao giờ tạo `role = ADMIN` qua form).
  - Tài khoản Admin chỉ được tạo thông qua database seed hoặc script nội bộ.

- **Scenario 4: Session Admin hết hạn**
  - **GIVEN** Admin đang thao tác trên Admin Dashboard.
  - **WHEN** `access_token` hết hạn (15 phút) và `refresh_token` cũng hết hạn (7 ngày).
  - **THEN** hệ thống tự động logout Admin và redirect về `/login` với thông báo "Phiên làm việc đã hết hạn."

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ Admin đăng nhập bằng Google OAuth.
- **KHÔNG** cho phép Admin reset mật khẩu qua email (chỉ qua script nội bộ/database).
- Chức năng Audit Log ghi nhận đăng nhập Admin là tự động, không thuộc phạm vi tương tác UI của Story này.
