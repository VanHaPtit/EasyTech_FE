# 📋 User Story 01: HR Đăng Nhập (Login with Email & Password)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** đăng nhập vào hệ thống bằng email và mật khẩu,
- **So that** tôi có thể truy cập vào HR Dashboard để quản lý tuyển dụng của công ty mình.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Đăng nhập thành công**
  - **GIVEN** người dùng đã có tài khoản HR hợp lệ và tài khoản đang ở trạng thái `ACTIVE`.
  - **WHEN** người dùng nhập đúng email và mật khẩu, nhấn "Đăng nhập".
  - **THEN** hệ thống xác thực credentials, tạo `access_token` (15 phút) và `refresh_token` (7 ngày), lưu vào HTTP-only cookie.
  - Người dùng được chuyển hướng đến `/dashboard` tương ứng với role (`HR` → HR Dashboard, `ADMIN` → Admin Dashboard).

- **Scenario 2: Sai mật khẩu hoặc email không tồn tại**
  - **GIVEN** người dùng nhập thông tin đăng nhập.
  - **WHEN** email không tồn tại hoặc mật khẩu không khớp.
  - **THEN** hệ thống trả về lỗi chung: _"Email hoặc mật khẩu không chính xác."_ (không tiết lộ thông tin nào không tồn tại).

- **Scenario 3: Tài khoản chưa được kích hoạt (Pending)**
  - **GIVEN** HR đã đăng ký nhưng công ty chưa được Admin duyệt.
  - **WHEN** HR cố gắng đăng nhập.
  - **THEN** hệ thống hiển thị thông báo: _"Tài khoản của bạn đang chờ phê duyệt. Vui lòng kiểm tra email để biết thêm thông tin."_

- **Scenario 4: Tài khoản bị vô hiệu hóa**
  - **GIVEN** tài khoản có trạng thái `INACTIVE`.
  - **WHEN** người dùng cố đăng nhập.
  - **THEN** hệ thống hiển thị: _"Tài khoản đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên."_

- **Scenario 5: Người dùng đã đăng nhập truy cập lại trang Login**
  - **GIVEN** người dùng đã có `access_token` hợp lệ trong cookie.
  - **WHEN** người dùng truy cập `/login`.
  - **THEN** hệ thống tự động redirect đến `/dashboard` mà không hiển thị form đăng nhập.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ đăng nhập 2 yếu tố (2FA) trong phiên bản này.
- **KHÔNG** giới hạn số lần đăng nhập thất bại (no account lockout) trong phiên bản này.
- Chức năng "Quên mật khẩu" là một tính năng riêng biệt, không thuộc User Story này.
