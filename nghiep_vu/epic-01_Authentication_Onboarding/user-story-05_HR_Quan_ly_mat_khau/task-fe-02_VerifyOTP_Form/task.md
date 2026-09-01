# Task FE: Verify OTP Form

## Mục đích
Xây dựng màn hình xác thực OTP trong luồng quên mật khẩu thuộc US-05, sau khi HR đã yêu cầu đặt lại mật khẩu bằng email.

## User Story liên quan
- US-05 - HR quản lý mật khẩu.

## Screen/Component
- Form `VerifyOtpForm`.
- Nhận email từ bước Forgot Password.

## Hành động của user
- HR nhập mã OTP gồm 6 chữ số.
- HR nhấn "Xác thực".
- HR có thể yêu cầu gửi lại OTP nếu hết hạn hoặc không nhận được email.

## Hành vi UI
- Hiển thị email đang được xác thực ở trạng thái chỉ đọc hoặc masked.
- Tự động focus vào ô OTP.
- Hiển thị countdown thời hạn OTP nếu backend trả thông tin thời hạn.
- Sau khi xác thực thành công, chuyển sang màn hình đặt mật khẩu mới với `resetToken`.

## Validation
- OTP bắt buộc nhập.
- OTP chỉ nhận chữ số.
- OTP đúng 6 ký tự.
- Chặn submit khi đang gọi API.

## Phản hồi thành công
- Lưu tạm `resetToken` trong state của flow, không lưu lâu dài trong localStorage.
- Điều hướng sang bước đặt mật khẩu mới.

## Xử lý lỗi
- OTP sai hoặc hết hạn: hiển thị lỗi "OTP không hợp lệ hoặc đã hết hạn".
- Quá số lần thử: yêu cầu HR gửi lại OTP.

## API dependency cụ thể
- `POST /api/v1/auth/verify-otp`.
- `POST /api/v1/auth/forgot-password` khi HR yêu cầu gửi lại OTP.
