# Task FE: Change Password / Reset Password Form

## Mục đích
Xây dựng form đặt lại hoặc đổi mật khẩu thuộc US-05, bao phủ hai ngữ cảnh:
- HR quên mật khẩu và đặt mật khẩu mới bằng `resetToken`.
- HR đang đăng nhập và chủ động đổi mật khẩu trong phần cài đặt tài khoản.

## User Story liên quan
- US-05 - HR quản lý mật khẩu.

## Screen/Component
- `ResetPasswordForm`: dùng sau bước xác thực OTP.
- `ChangePasswordForm`: dùng trong trang cài đặt khi HR đang đăng nhập.

## Hành động của user
- Với reset password: HR nhập mật khẩu mới và xác nhận mật khẩu.
- Với change password: HR nhập mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu.
- HR nhấn "Cập nhật mật khẩu".

## Hành vi UI
- Hiển thị rule mật khẩu để HR biết yêu cầu trước khi submit.
- Có nút ẩn/hiện mật khẩu cho từng ô nhập.
- Sau khi reset password thành công, điều hướng về `/login`.
- Sau khi change password thành công, giữ phiên hiện tại và hiển thị thông báo thành công.

## Validation
- Mật khẩu mới bắt buộc nhập.
- Mật khẩu mới tối thiểu 8 ký tự, có ít nhất 1 chữ hoa và 1 chữ số.
- Mật khẩu mới tối đa 72 ký tự để đồng bộ giới hạn xử lý mật khẩu của backend.
- `confirmPassword` phải khớp `newPassword`.
- Với change password, `currentPassword` bắt buộc nhập.
- Mật khẩu mới không được trùng mật khẩu hiện tại.

## Phản hồi thành công
- Reset password: hiển thị "Đặt lại mật khẩu thành công" và chuyển về đăng nhập.
- Change password: hiển thị "Đổi mật khẩu thành công"; các phiên khác sẽ bị thu hồi theo xử lý backend.

## Xử lý lỗi
- Reset token không hợp lệ/hết hạn: yêu cầu quay lại bước quên mật khẩu.
- Mật khẩu hiện tại sai: hiển thị lỗi tại field `currentPassword`.
- Backend trả lỗi policy mật khẩu: hiển thị message cụ thể từ API.

## API dependency cụ thể
- `POST /api/v1/auth/reset-password`.
- `POST /api/v1/auth/change-password`.
