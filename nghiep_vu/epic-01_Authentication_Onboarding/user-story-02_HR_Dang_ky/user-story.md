# 📋 User Story 02: HR Đăng Ký (Company Registration)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR) chưa có tài khoản,
- **I want to** đăng ký tài khoản mới cho công ty mình,
- **So that** tôi có thể bắt đầu sử dụng hệ thống EasyTech để quản lý tuyển dụng sau khi được Admin phê duyệt.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Đăng ký thành công với thông tin hợp lệ**
  - **GIVEN** người dùng chưa có tài khoản trên hệ thống.
  - **WHEN** người dùng điền đầy đủ form: Họ tên, Email công ty, Mật khẩu (≥ 8 ký tự, có chữ hoa + số), Tên công ty, Mã số thuế, và nhấn "Đăng ký".
  - **THEN** hệ thống tạo bản ghi trong bảng `companies` (status = `PENDING`) và `users` (role = `HR_ADMIN`, status = `PENDING`).
  - Gửi email xác nhận đến HR và thông báo đến Admin để phê duyệt.
  - Chuyển hướng HR đến trang `/pending` với thông báo chờ phê duyệt.

- **Scenario 2: Email đã tồn tại trong hệ thống**
  - **GIVEN** email người dùng nhập đã được đăng ký bởi tài khoản khác.
  - **WHEN** người dùng nhấn "Đăng ký".
  - **THEN** hệ thống hiển thị lỗi inline: _"Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác."_

- **Scenario 3: Validate form trước khi submit**
  - **GIVEN** người dùng bỏ trống trường bắt buộc hoặc nhập mật khẩu không đủ điều kiện.
  - **WHEN** người dùng nhấn "Đăng ký".
  - **THEN** form hiển thị thông báo lỗi tại từng trường: "Vui lòng điền đầy đủ thông tin", "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa và số."

- **Scenario 4: Mã số thuế đã được đăng ký**
  - **GIVEN** một công ty khác đã đăng ký với cùng mã số thuế.
  - **WHEN** người dùng submit form.
  - **THEN** hệ thống hiển thị lỗi: _"Mã số thuế này đã được đăng ký. Vui lòng liên hệ hỗ trợ nếu có nhầm lẫn."_

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ đăng ký cho ứng viên (Candidate) – ứng viên không cần tài khoản.
- **KHÔNG** tự động kích hoạt tài khoản – phải qua bước Admin phê duyệt (User Story 05).
- Xác thực email qua OTP/link là tính năng tùy chọn, không bắt buộc trong phiên bản này.
