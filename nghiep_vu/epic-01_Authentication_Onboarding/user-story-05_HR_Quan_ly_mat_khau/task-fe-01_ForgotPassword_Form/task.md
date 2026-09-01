# Task FE: Forgot Password Form

## Mục đích
Xác định phạm vi frontend cho task 'ForgotPassword Form' trong US-05 HR Quan ly mat khau, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Hiển thị giao diện và trạng thái tương ứng với nghiệp vụ của user story, gồm loading, empty, success và error state khi cần.
- Thu thập dữ liệu người dùng, validate ở mức UI để cải thiện trải nghiệm và gọi đúng API dependency đã mô tả.
- Hiển thị phản hồi rõ ràng cho người dùng, giữ dữ liệu đang nhập khi có lỗi hợp lệ và điều hướng theo đúng flow nghiệp vụ.
- Không tự quyết định trạng thái nghiệp vụ nhạy cảm; frontend tuân theo response và quyền do backend trả về.

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
