# 📋 User Story 02: HR Đăng Ký (Company Registration)

## 1. MÔ TẢ USER STORY
- **Là** Nhà tuyển dụng (HR) chưa có tài khoản,
- **Tôi muốn** đăng ký công ty và tài khoản HR của mình,
- **Để** tôi có thể bắt đầu sử dụng hệ thống sau khi được Admin phê duyệt và không cần hiểu các khái niệm kỹ thuật.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: Đăng ký thành công với thông tin hợp lệ**
  - **VỚI ĐIỀU KIỆN** người dùng chưa có tài khoản trên hệ thống.
  - **KHI** người dùng điền đầy đủ form: Họ tên, Email công ty, Mật khẩu (≥ 8 ký tự, có chữ hoa + số), Tên công ty, Mã số thuế, và nhấn "Đăng ký".
  - **THÌ** hệ thống tạo bản ghi trong bảng `companies` với `status = PENDING` và `users` với `role = HR_ADMIN`, `status = PENDING`.
  - Hệ thống gửi email xác nhận đến HR và gửi yêu cầu phê duyệt đến Admin.
  - HR được chuyển đến trang Chờ duyệt với trạng thái đã tiếp nhận đơn đăng ký.

- **Kịch bản 2: Trang chờ duyệt**
  - **VỚI ĐIỀU KIỆN** đăng ký đã được tạo thành công.
  - **KHI** HR xem màn hình Chờ duyệt.
  - **THÌ** màn hình hiển thị: đơn đăng ký đã được tiếp nhận, doanh nghiệp đang chờ review, trạng thái hiện tại, email nhận thông báo, CTA kiểm tra lại trạng thái, và nút đăng xuất.
  - Không hiển thị màn hình rỗng chỉ có câu "Đang chờ phê duyệt" mà không có thông tin rõ ràng.

- **Kịch bản 3: Email đã tồn tại**
  - **VỚI ĐIỀU KIỆN** email người dùng nhập đã được đăng ký bởi tài khoản khác.
  - **KHI** người dùng nhấn "Đăng ký".
  - **THÌ** hệ thống hiển thị lỗi inline: _"Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác."_

- **Kịch bản 4: Validation**
  - **VỚI ĐIỀU KIỆN** người dùng bỏ trống trường bắt buộc hoặc nhập mật khẩu không đủ điều kiện.
  - **KHI** người dùng nhấn "Đăng ký".
  - **THÌ** form hiển thị lỗi tại từng trường và không clear toàn bộ form.

- **Kịch bản 5: Mã số thuế đã được đăng ký**
  - **VỚI ĐIỀU KIỆN** một công ty khác đã đăng ký với cùng mã số thuế.
  - **KHI** người dùng submit form.
  - **THÌ** hệ thống hiển thị lỗi rõ ràng: _"Mã số thuế này đã được đăng ký. Vui lòng liên hệ hỗ trợ nếu có nhầm lẫn."_

- **Kịch bản 6: Bị từ chối → chỉnh sửa + gửi lại**
  - **VỚI ĐIỀU KIỆN** company đã bị Admin từ chối.
  - **KHI** HR click "Chỉnh sửa và gửi lại".
  - **THÌ** hệ thống cho phép sửa thông tin cần bổ sung và gửi lại đơn. Company trở về `PENDING` sau khi resubmit.

## 3. BUSINESS RULES

### Company & User Creation
- Registration tạo **Company** với `status = PENDING` và **User** (HR_ADMIN) với `status = PENDING`.
- Cả Company và User phải cùng được Admin duyệt trước khi activate.
- Khi Admin approve: Company = ACTIVE, User = ACTIVE.
- Khi Admin reject: Company = REJECTED, User = PENDING (restricted).

### Approval & Resubmit
- Đăng ký phải đi qua kênh duyệt; không được cho phép company vào Dashboard ngay sau khi đăng ký.
- Nếu `company.status = REJECTED`, HR không được dead-end. Phải có route để xem lý do, sửa, resubmit.
- Khi gửi lại hồ sơ: Company = PENDING, User = PENDING, luồng duyệt được lặp lại.

### Auth Method
- Google OAuth chỉ là phương thức auth bổ sung trong tương lai. Trọng tâm MVP là email/password.

## 4. NGOÀI PHẠM VI
- **KHÔNG** hỗ trợ đăng ký cho ứng viên (Candidate) – ứng viên không cần tài khoản.
- **KHÔNG** tự động kích hoạt tài khoản – phải qua bước Admin phê duyệt.
- Xác thực email qua OTP/link là cải tiến trong tương lai, không bắt buộc trong MVP.
