# 📋 User Story 31: Admin Xem Audit Logs (Nhật Ký Hoạt Động Hệ Thống)

## 1. MÔ TẢ USER STORY
- **As a** Quản trị viên Hệ thống (System Admin),
- **I want to** xem nhật ký đầy đủ toàn bộ hoạt động quan trọng diễn ra trên hệ thống,
- **So that** tôi có thể kiểm tra, điều tra sự cố, phát hiện hành vi bất thường và đảm bảo tuân thủ quy định bảo mật dữ liệu.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Admin xem danh sách Audit Logs**
  - **GIVEN** Admin đang đăng nhập vào Admin Dashboard.
  - **WHEN** Admin truy cập `/admin/audit-logs`.
  - **THEN** hệ thống hiển thị bảng nhật ký hoạt động với các cột: Thời gian, Tên người dùng, Email, Công ty, Hành động (action), Đối tượng (entity_type / entity_id), IP Address.
  - Mặc định hiển thị 50 bản ghi gần nhất, sắp xếp theo thời gian giảm dần.

- **Scenario 2: Admin lọc Audit Logs theo điều kiện**
  - **GIVEN** Admin đang xem trang Audit Logs.
  - **WHEN** Admin sử dụng bộ lọc: chọn khoảng thời gian (date range), chọn loại hành động (LOGIN, CREATE_JOB, PUBLISH_JOB, DELETE_USER,...), nhập email người dùng.
  - **THEN** bảng kết quả cập nhật theo đúng điều kiện lọc đã chọn.

- **Scenario 3: Hệ thống tự động ghi Audit Log cho các hành động quan trọng**
  - **GIVEN** hệ thống đang hoạt động bình thường.
  - **WHEN** bất kỳ người dùng nào thực hiện một trong các hành động: Đăng nhập, Đăng xuất, Tạo/Sửa/Xóa Job, Publish/Unpublish Job, Thay đổi Role thành viên, Cập nhật AI Provider Key, Xóa tài khoản.
  - **THEN** hệ thống tự động ghi một bản ghi vào bảng `audit_logs` với đầy đủ thông tin: `user_id`, `action`, `entity_type`, `entity_id`, `ip_address`, `user_agent`, `created_at`.

- **Scenario 4: Admin xem chi tiết một log entry**
  - **GIVEN** Admin thấy một bản ghi bất thường trong danh sách (ví dụ: xóa nhiều dữ liệu liên tiếp).
  - **WHEN** Admin nhấn vào bản ghi đó.
  - **THEN** hệ thống hiển thị chi tiết đầy đủ: dữ liệu trước thay đổi (before), dữ liệu sau thay đổi (after), metadata request (IP, User Agent, Request ID).

- **Scenario 5: Admin không thể chỉnh sửa hoặc xóa Audit Logs**
  - **GIVEN** Admin đang xem danh sách Audit Logs.
  - **WHEN** Admin cố gắng tìm tùy chọn xóa hoặc chỉnh sửa log.
  - **THEN** không có nút/chức năng nào cho phép chỉnh sửa hoặc xóa – Audit Logs là immutable (chỉ đọc).

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** ghi log cho các hành động đọc thông thường (GET requests) để tránh bloat dữ liệu.
- **KHÔNG** hỗ trợ xuất Audit Log ra file PDF/Excel trong phiên bản này.
- Audit Logs **KHÔNG** được chia sẻ cho HR – chỉ System Admin mới có quyền xem.
