# 📋 User Story 16: Candidate Drawer (Xem Chi Tiết Hồ Sơ Ứng Viên)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** xem chi tiết toàn bộ hồ sơ của ứng viên (CV, Form trả lời, Email History, AI Score) trong một giao diện Drawer mở từ bên phải màn hình,
- **So that** tôi không bị chuyển trang liên tục, có thể thao tác nhanh với ứng viên và giữ nguyên ngữ cảnh của danh sách (Kanban/List).
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR mở xem Drawer của một ứng viên**
  - **GIVEN** HR đang ở màn hình Kanban hoặc List View.
  - **WHEN** HR click vào một card ứng viên (trên Kanban) hoặc một hàng (trên List).
  - **THEN** hệ thống trượt Drawer từ bên phải màn hình ra (không reload trang).
  - Drawer hiển thị thông tin tổng quan ở phần Header: Họ tên, Email, Số ĐT, Vòng hiện tại, Trạng thái (New/In Progress/Passed/Rejected), và Điểm AI (nếu có).

- **Scenario 2: HR xem các Tab thông tin trong Drawer**
  - **GIVEN** Drawer đang mở.
  - **WHEN** HR chuyển đổi qua lại giữa các Tab (Hồ sơ, Đánh giá, Lịch phỏng vấn, Lịch sử Email).
  - **THEN** hệ thống tải và hiển thị dữ liệu tương ứng của ứng viên đó trong từng tab:
    - Tab **Hồ sơ**: Nút xem PDF CV (in-app preview hoặc tab mới) và câu trả lời các câu hỏi phụ.
    - Tab **Đánh giá**: Form đánh giá và lịch sử.
    - Tab **Lịch phỏng vấn**: Thông tin lịch hẹn.
    - Tab **Email**: Các email đã gửi.

- **Scenario 3: HR thực hiện Action từ Drawer**
  - **GIVEN** Drawer đang mở.
  - **WHEN** HR nhấn vào các nút chức năng (Đổi vòng, Đánh dấu Đạt, Đánh dấu Trượt).
  - **THEN** hệ thống xử lý logic tương ứng, hiển thị thông báo thành công và cập nhật lại thông tin hiển thị trên Header của Drawer cũng như trên bảng/kanban bên dưới.

- **Scenario 4: HR đóng Drawer**
  - **GIVEN** Drawer đang mở.
  - **WHEN** HR nhấn nút "X", hoặc click ra ngoài vùng xám (backdrop).
  - **THEN** Drawer trượt đóng lại, màn hình Kanban/List phía dưới không thay đổi vị trí cuộn ban đầu.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** có tính năng "Preview PDF" trực tiếp nhúng vào Drawer nếu trình duyệt không hỗ trợ iframe PDF chuẩn (chấp nhận mở tab mới).
- **KHÔNG** hỗ trợ tính năng Chat trực tuyến với ứng viên trong Drawer.
