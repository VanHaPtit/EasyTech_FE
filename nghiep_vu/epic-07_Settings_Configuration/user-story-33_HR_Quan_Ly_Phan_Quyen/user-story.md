# 📋 User Story 33: HR Quản Lý Phân Quyền (Role-Based Access Control - RBAC)

## 1. MÔ TẢ USER STORY
- **Là** Quản trị viên Công ty (Company Admin / HR có quyền Admin),
- **Tôi muốn** quản lý danh sách tài khoản HR trong công ty và phân quyền vai trò (Role) cho từng thành viên,
- **Để** tôi có thể kiểm soát ai được phép xem/chỉnh sửa thông tin tuyển dụng, đảm bảo dữ liệu nội bộ an toàn và phù hợp trách nhiệm từng người.
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: HR Admin xem danh sách thành viên trong công ty**
  - **VỚI ĐIỀU KIỆN** người dùng có role `HR_ADMIN` đang đăng nhập vào hệ thống.
  - **KHI** HR Admin truy cập `/dashboard/settings/members`.
  - **THÌ** hệ thống hiển thị danh sách tất cả tài khoản thuộc `company_id` của HR đó, bao gồm: Tên, Email, Role hiện tại, Ngày tạo, Trạng thái (Active / Inactive).

- **Kịch bản 2: HR Admin mời thành viên mới vào công ty**
  - **VỚI ĐIỀU KIỆN** HR Admin đang ở trang quản lý thành viên.
  - **KHI** HR Admin nhấn "Mời thành viên", nhập email và chọn Role (HR / HR_ADMIN), sau đó nhấn "Gửi lời mời".
  - **THÌ** hệ thống tạo invite token, gửi email mời đến địa chỉ email đó với link xác nhận có hạn 24 giờ.
  - Danh sách thành viên hiển thị bản ghi mới với trạng thái "Chờ xác nhận".

- **Kịch bản 3: HR Admin thay đổi Role của thành viên**
  - **VỚI ĐIỀU KIỆN** một thành viên đang có role `HR` trong danh sách.
  - **KHI** HR Admin nhấn vào dropdown Role của thành viên đó và chọn `HR_ADMIN`.
  - **THÌ** hệ thống cập nhật `users.role` ngay lập tức và thành viên đó có quyền truy cập tính năng Admin trong lần truy cập tiếp theo (hoặc sau khi refresh token).
  - HR Admin **không thể** tự hạ quyền của chính mình.

- **Kịch bản 4: HR Admin vô hiệu hóa tài khoản thành viên**
  - **VỚI ĐIỀU KIỆN** một thành viên có role `HR` đang hoạt động.
  - **KHI** HR Admin nhấn nút "Vô hiệu hóa" trên tài khoản đó và xác nhận.
  - **THÌ** hệ thống cập nhật `users.status = INACTIVE`, tài khoản đó không thể đăng nhập nữa.
  - Tất cả các Job, ứng viên mà thành viên đó đã quản lý vẫn giữ nguyên (không xóa dữ liệu).

- **Kịch bản 5: HR thường (không phải Admin) không có quyền truy cập trang RBAC**
  - **VỚI ĐIỀU KIỆN** người dùng có role `HR` (không phải `HR_ADMIN`).
  - **KHI** người dùng cố truy cập `/dashboard/settings/members` (trực tiếp qua URL).
  - **THÌ** hệ thống chuyển hướng đến trang `/403` với thông báo "Bạn không có quyền truy cập tính năng này."

## 3. NGOÀI PHẠM VI
- **KHÔNG** hỗ trợ phân quyền theo từng Job cụ thể (job-level permission) trong phiên bản này – quyền áp dụng cho toàn bộ company.
- **KHÔNG** tích hợp Single Sign-On (SSO) với hệ thống nhân sự bên ngoài.
- **KHÔNG** hỗ trợ tạo Role tùy chỉnh – chỉ có 2 role cố định: `HR` và `HR_ADMIN`.
