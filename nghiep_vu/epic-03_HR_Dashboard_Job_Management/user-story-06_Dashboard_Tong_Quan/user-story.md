# 📋 User Story 06: Dashboard Tổng Quan (HR Dashboard Overview)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** xem trang tổng quan (Dashboard) ngay khi đăng nhập, hiển thị các số liệu thống kê chính và công việc cần làm,
- **So that** tôi có thể nắm bắt nhanh tình hình tuyển dụng của công ty và biết mình cần ưu tiên xử lý việc gì trong ngày.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR xem các thẻ số liệu thống kê (Metric Cards)**
  - **GIVEN** HR đăng nhập vào hệ thống.
  - **WHEN** HR truy cập `/dashboard`.
  - **THEN** hệ thống hiển thị 4 thẻ số liệu của công ty (theo bộ lọc thời gian mặc định: 30 ngày qua):
    1. Tổng số Job đang mở (ACTIVE)
    2. Tổng số Ứng viên mới nộp (trạng thái NEW)
    3. Số lịch phỏng vấn sắp tới (trong 7 ngày tới)
    4. Tỷ lệ tuyển dụng thành công (Hired Candidates / Total Candidates)

- **Scenario 2: HR xem biểu đồ xu hướng ứng tuyển**
  - **GIVEN** HR đang ở trang Dashboard.
  - **WHEN** cuộn xuống phần biểu đồ.
  - **THEN** hiển thị biểu đồ đường (Line Chart) thể hiện số lượng đơn ứng tuyển nhận được theo từng ngày trong 30 ngày qua.

- **Scenario 3: HR xem danh sách việc cần làm (To-Do / Recent Activities)**
  - **GIVEN** HR đang ở trang Dashboard.
  - **WHEN** xem panel bên phải (hoặc bên dưới).
  - **THEN** hiển thị danh sách các mục cần chú ý:
    - Ứng viên chờ duyệt (mới nhất).
    - Lịch phỏng vấn trong hôm nay và ngày mai.
    - Phản hồi từ chối phỏng vấn của ứng viên (nếu có).

- **Scenario 4: Lọc dữ liệu Dashboard theo thời gian**
  - **GIVEN** HR đang ở trang Dashboard.
  - **WHEN** HR chọn khoảng thời gian từ dropdown (7 ngày qua, 30 ngày qua, Tháng này, Năm nay).
  - **THEN** các số liệu và biểu đồ tự động cập nhật theo khoảng thời gian được chọn.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ HR tự custom giao diện Dashboard (kéo thả các widget) trong phiên bản này.
- **KHÔNG** hiển thị dữ liệu của công ty khác (bảo đảm multi-tenant).
