# 📋 User Story 05: Admin Duyệt Doanh Nghiệp (Approve Company Registrations)

## 1. MÔ TẢ USER STORY
- **As a** Quản trị viên Hệ thống (System Admin),
- **I want to** xem danh sách các công ty mới đăng ký và thực hiện phê duyệt (Approve) hoặc từ chối (Reject),
- **So that** chỉ những doanh nghiệp hợp lệ mới được cấp quyền sử dụng hệ thống, tránh spam và tài khoản ảo.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Admin xem danh sách công ty chờ phê duyệt**
  - **GIVEN** Admin đang đăng nhập vào Admin Dashboard.
  - **WHEN** Admin truy cập trang `/admin/companies/pending`.
  - **THEN** hệ thống hiển thị danh sách các công ty có trạng thái `PENDING`. Thông tin gồm: Tên công ty, Email người đăng ký, Mã số thuế, Ngày đăng ký.

- **Scenario 2: Admin phê duyệt công ty thành công**
  - **GIVEN** Admin đang xem chi tiết một công ty chờ phê duyệt.
  - **WHEN** Admin nhấn nút "Phê duyệt" (Approve).
  - **THEN** hệ thống cập nhật `companies.status = ACTIVE` và `users.status = ACTIVE` cho tài khoản HR đăng ký.
  - Hệ thống tự động gửi email thông báo: "Tài khoản của bạn đã được phê duyệt. Bạn có thể đăng nhập ngay." đến HR.

- **Scenario 3: Admin từ chối công ty**
  - **GIVEN** Admin đang xem chi tiết một công ty chờ phê duyệt.
  - **WHEN** Admin nhấn nút "Từ chối" (Reject) và nhập lý do (bắt buộc).
  - **THEN** hệ thống cập nhật `companies.status = REJECTED` và gửi email thông báo từ chối kèm lý do cho HR.
  - Công ty này bị ẩn khỏi danh sách `PENDING`.

- **Scenario 4: Kiểm tra trùng lặp thông tin trước khi duyệt**
  - **GIVEN** một công ty đang chờ duyệt.
  - **WHEN** Admin mở chi tiết công ty.
  - **THEN** hệ thống tự động cảnh báo nếu Mã số thuế hoặc Tên công ty có dấu hiệu trùng lặp (similarity > 90%) với một công ty đã `ACTIVE` trong hệ thống.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** tích hợp API quốc gia để tự động xác thực Mã số thuế (kiểm tra thủ công).
- **KHÔNG** cho phép Admin chỉnh sửa thông tin công ty trước khi duyệt.
