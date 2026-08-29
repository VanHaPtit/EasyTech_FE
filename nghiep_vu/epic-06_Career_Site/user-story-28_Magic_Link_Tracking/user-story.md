# 📋 User Story 28: Magic Link Tracking (Tra cứu hồ sơ không dùng mật khẩu)

## 1. MÔ TẢ USER STORY
- **As a** Ứng viên (Candidate),
- **I want to** nhận được một đường link bảo mật (Magic Link) qua email sau khi nộp CV thành công,
- **So that** tôi có thể tự tra cứu trạng thái hồ sơ của mình mà không cần phải đăng ký tài khoản hoặc mật khẩu trên hệ thống.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Ứng viên truy cập bằng Magic Link hợp lệ**
  - **GIVEN** ứng viên đã nộp đơn ứng tuyển thành công và hệ thống đã tạo một `secure_token` (UUID ngẫu nhiên, thời hạn 48 giờ) và lưu vào bảng `applications`.
  - **WHEN** ứng viên nhấp vào đường dẫn trong email xác nhận: `/careers/applications/track?token={secure_token}`.
  - **THEN** Backend xác minh `secure_token` trong database:
    - Nếu token **hợp lệ và còn hạn**: hệ thống trả về trang tra cứu `/careers/applications/status` với thông tin trạng thái đơn ứng tuyển (vòng hiện tại, trạng thái PASS/FAIL, lịch phỏng vấn nếu có).
    - Trang hiển thị: tên ứng viên, tên Job đã ứng tuyển, tên công ty, trạng thái vòng hiện tại, và lịch hẹn phỏng vấn (nếu có).

- **Scenario 2: Magic Link đã hết hạn**
  - **GIVEN** ứng viên có `secure_token` đã tồn tại trong database nhưng thời gian tạo đã vượt quá 48 giờ.
  - **WHEN** ứng viên truy cập link với token đó.
  - **THEN** hệ thống hiển thị thông báo lỗi: _"Liên kết tra cứu đã hết hạn (quá 48 giờ). Vui lòng nhập email để nhận link mới."_
  - Hệ thống hiển thị form nhập email để gửi lại Magic Link mới.
  - Khi ứng viên nhập email hợp lệ, hệ thống tạo token mới, cập nhật vào database và gửi email mới.

- **Scenario 3: Magic Link không hợp lệ (token bị sửa đổi / giả mạo)**
  - **WHEN** ứng viên truy cập link với token không tồn tại trong database.
  - **THEN** hệ thống hiển thị trang lỗi: _"Liên kết tra cứu không hợp lệ."_ và không tiết lộ bất kỳ thông tin nào.

- **Scenario 4: Ứng viên tra cứu sau khi xác nhận / từ chối lịch phỏng vấn**
  - **GIVEN** ứng viên đã phản hồi lịch phỏng vấn (CONFIRM hoặc DECLINE).
  - **WHEN** ứng viên mở lại trang tra cứu bằng cùng Magic Link (vẫn còn hạn).
  - **THEN** trang tra cứu hiển thị trạng thái phản hồi hiện tại (đã xác nhận / đã từ chối) thay vì hiển thị nút hành động.

## 3. NGOÀI PHẠM VI (Out of Scope)
- Ứng viên **KHÔNG** được chỉnh sửa thông tin cá nhân, thay đổi file CV hoặc rút đơn ứng tuyển từ trang tra cứu (Read-only).
- Magic Link **KHÔNG** cấp quyền đăng nhập vào hệ thống HR Dashboard.
- **KHÔNG** triển khai cơ chế làm mới token tự động (auto-renew) – ứng viên phải tự yêu cầu gửi lại.
