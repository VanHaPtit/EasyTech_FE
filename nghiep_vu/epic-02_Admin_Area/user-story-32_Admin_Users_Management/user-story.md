# 📋 User Story 32: Admin Quản Lý Users (Tài Khoản Người Dùng Hệ Thống)

## 1. MÔ TẢ USER STORY
- **As a** Quản trị viên Hệ thống (System Admin),
- **I want to** xem và quản lý toàn bộ tài khoản người dùng trên hệ thống (HR của tất cả các công ty),
- **So that** tôi có thể hỗ trợ xử lý sự cố tài khoản, vô hiệu hóa tài khoản vi phạm và giám sát tổng thể hoạt động người dùng.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Admin xem danh sách tất cả người dùng**
  - **GIVEN** System Admin đang đăng nhập vào Admin Dashboard.
  - **WHEN** Admin truy cập `/admin/users`.
  - **THEN** hệ thống hiển thị bảng danh sách tất cả tài khoản trong hệ thống (phân trang 20 bản ghi/trang), gồm: Tên, Email, Tên công ty, Role, Trạng thái, Ngày tạo, Lần đăng nhập cuối.

- **Scenario 2: Admin tìm kiếm và lọc người dùng**
  - **GIVEN** Admin đang xem danh sách Users.
  - **WHEN** Admin nhập từ khóa tìm kiếm (tên/email) hoặc chọn bộ lọc theo: Công ty, Role (HR / HR_ADMIN / ADMIN), Trạng thái (Active / Inactive).
  - **THEN** danh sách lọc kết quả theo đúng điều kiện, hiển thị tổng số kết quả tìm được.

- **Scenario 3: Admin xem chi tiết tài khoản người dùng**
  - **GIVEN** Admin muốn kiểm tra thông tin cụ thể của một tài khoản.
  - **WHEN** Admin nhấn vào tên của người dùng đó.
  - **THEN** hệ thống hiển thị trang chi tiết: thông tin cơ bản, công ty thuộc về, lịch sử đăng nhập 10 lần gần nhất, danh sách Job đã tạo (nếu là HR).

- **Scenario 4: Admin vô hiệu hóa tài khoản vi phạm**
  - **GIVEN** Admin phát hiện một tài khoản có hành vi bất thường (qua Audit Logs).
  - **WHEN** Admin nhấn "Vô hiệu hóa tài khoản" và nhập lý do.
  - **THEN** hệ thống cập nhật `users.status = INACTIVE`, tài khoản bị logout ngay lập tức (invalidate all active tokens).
  - Ghi lại hành động này vào Audit Logs với lý do Admin nhập.

- **Scenario 5: Admin kích hoạt lại tài khoản đã bị vô hiệu hóa**
  - **GIVEN** một tài khoản đang có trạng thái `INACTIVE`.
  - **WHEN** Admin nhấn "Kích hoạt lại".
  - **THEN** hệ thống cập nhật `users.status = ACTIVE`, người dùng có thể đăng nhập bình thường trở lại.

## 3. NGOÀI PHẠM VI (Out of Scope)
- System Admin **KHÔNG** thể thay đổi mật khẩu của người dùng – người dùng phải tự đặt lại qua "Quên mật khẩu".
- **KHÔNG** hỗ trợ tạo tài khoản HR trực tiếp từ Admin Dashboard – HR tự đăng ký qua flow Onboarding.
- **KHÔNG** cho phép Admin xem mật khẩu hoặc dữ liệu nhạy cảm của người dùng.
