# 📋 User Story 31: Admin Xem Audit Logs (Nhật Ký Hoạt Động Hệ Thống)

## 1. MÔ TẢ USER STORY
- **Là** Quản trị viên Hệ thống (System Admin),
- **Tôi muốn** xem nhật ký đầy đủ toàn bộ hoạt động quan trọng diễn ra trên hệ thống,
- **Để** tôi có thể kiểm tra, điều tra sự cố, phát hiện hành vi bất thường và đảm bảo tuân thủ quy định bảo mật dữ liệu.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: Admin xem danh sách Audit Logs**
  - **VỚI ĐIỀU KIỆN** Admin đang đăng nhập vào Admin Dashboard.
  - **KHI** Admin truy cập `/admin/audit-logs`.
  - **THÌ** hệ thống hiển thị bảng nhật ký hoạt động với các cột: Thời gian, Tên người dùng, Email, Công ty, Hành động (action), Đối tượng (entity_type / entity_id), IP Address.
  - Mặc định hiển thị 50 bản ghi gần nhất, sắp xếp theo thời gian giảm dần.

- **Kịch bản 2: Admin lọc Audit Logs theo điều kiện**
  - **VỚI ĐIỀU KIỆN** Admin đang xem trang Audit Logs.
  - **KHI** Admin sử dụng bộ lọc: chọn khoảng thời gian (date range), chọn loại hành động (LOGIN, CREATE_JOB, PUBLISH_JOB, DELETE_USER,...), nhập email người dùng.
  - **THÌ** bảng kết quả cập nhật theo đúng điều kiện lọc đã chọn.

- **Kịch bản 3: Hệ thống tự động ghi Audit Log cho các hành động quan trọng**
  - **VỚI ĐIỀU KIỆN** hệ thống đang hoạt động bình thường.
  - **KHI** bất kỳ người dùng nào thực hiện một trong các hành động: Đăng nhập, Đăng xuất, Tạo/Sửa/Xóa Job, Publish Job, Close Job, Thay đổi Role thành viên, Cập nhật AI Provider Key, Xóa tài khoản.
  - **THÌ** hệ thống tự động ghi một bản ghi vào bảng `audit_logs` với đầy đủ thông tin: `user_id`, `action`, `entity_type`, `entity_id`, `ip_address`, `user_agent`, `created_at`.

- **Kịch bản 4: Admin xem chi tiết một log entry**
  - **VỚI ĐIỀU KIỆN** Admin thấy một bản ghi bất thường trong danh sách (ví dụ: xóa nhiều dữ liệu liên tiếp).
  - **KHI** Admin nhấn vào bản ghi đó.
  - **THÌ** hệ thống hiển thị chi tiết đầy đủ: dữ liệu trước thay đổi (before), dữ liệu sau thay đổi (after), metadata request (IP, User Agent, Request ID).

- **Kịch bản 5: Admin không thể chỉnh sửa hoặc xóa Audit Logs**
  - **VỚI ĐIỀU KIỆN** Admin đang xem danh sách Audit Logs.
  - **KHI** Admin cố gắng tìm tùy chọn xóa hoặc chỉnh sửa log.
  - **THÌ** không có nút/chức năng nào cho phép chỉnh sửa hoặc xóa – Audit Logs là immutable (chỉ đọc).

## 3. NGOÀI PHẠM VI
- **KHÔNG** ghi log cho các hành động đọc thông thường (GET requests) để tránh bloat dữ liệu.
- **KHÔNG** hỗ trợ xuất Audit Log ra file PDF/Excel trong phiên bản này.
- Audit Logs **KHÔNG** được chia sẻ cho HR – chỉ System Admin mới có quyền xem.
