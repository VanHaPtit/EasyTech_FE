# Task FE: Forgot Password Form

## Mục đích
Xây dựng màn hình cho luồng HR quên mật khẩu thuộc US-05, cho phép HR nhập email đã đăng ký để yêu cầu mã OTP hoặc hướng dẫn đặt lại mật khẩu.

## User Story liên quan
- US-05 - HR quản lý mật khẩu.

## Screen/Component
- Trang/form `ForgotPasswordForm`.
- Có thể truy cập từ link "Quên mật khẩu" tại trang `/login`.

## Hành động của user
- HR nhập email đã đăng ký.
- HR nhấn nút "Gửi hướng dẫn".
- HR quay lại trang đăng nhập nếu không muốn tiếp tục.

## Hành vi UI
- Hiển thị input email, nút submit và link quay lại đăng nhập.
- Khi submit thành công, chuyển sang bước nhập OTP hoặc hiển thị CTA mở màn hình xác thực OTP.
- Không tiết lộ email có tồn tại trong hệ thống hay không; luôn hiển thị thông báo chung theo response backend.

## Validation
- Email bắt buộc nhập.
- Email phải đúng định dạng.
- Chặn submit khi form đang gửi request.

## Phản hồi thành công
- Hiển thị message: "Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu sẽ được gửi."
- Điều hướng sang màn hình nhập OTP kèm email đã nhập.

## Xử lý lỗi
- Nếu email sai định dạng: hiển thị lỗi tại field.
- Nếu backend trả lỗi rate limit hoặc lỗi hệ thống: hiển thị toast/message rõ ràng, không làm mất email đã nhập.

## API dependency cụ thể
- `POST /api/v1/auth/forgot-password`.
