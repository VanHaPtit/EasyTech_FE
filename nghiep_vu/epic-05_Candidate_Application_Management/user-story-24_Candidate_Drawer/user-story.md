# 📋 User Story 16: Candidate Drawer (Xem Chi Tiết Hồ Sơ Ứng Viên)

## 1. MÔ TẢ USER STORY
- **Là** Nhà tuyển dụng (HR),
- **Tôi muốn** xem chi tiết toàn bộ hồ sơ của ứng viên (CV, Form trả lời, Email History, AI Score) trong một giao diện Drawer mở từ bên phải màn hình,
- **Để** tôi không bị chuyển trang liên tục, có thể thao tác nhanh với ứng viên và giữ nguyên ngữ cảnh của danh sách (Kanban/List).
- **Story Points:** 5

## SƠ ĐỒ LUỒNG NGHIỆP VỤ (Business Flow)

```mermaid
graph TD
    A[Click vào Card Ứng viên] --> B[Mở Drawer bên phải]
    B --> C[Tải chi tiết CV, Thông tin, Đánh giá]
    C --> D[Hiển thị UI Tabs]
    D --> E{Tương tác}
    E -- Đọc CV --> F[Mở PDF Viewer]
    E -- Đánh giá --> G[Lưu nhận xét]
```

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: HR mở xem Drawer của một ứng viên**
  - **VỚI ĐIỀU KIỆN** HR đang ở màn hình Kanban hoặc List View.
  - **KHI** HR click vào một card ứng viên (trên Kanban) hoặc một hàng (trên List).
  - **THÌ** hệ thống trượt Drawer từ bên phải màn hình ra (không reload trang).
  - Drawer hiển thị thông tin tổng quan ở phần Header: Họ tên, Email, Số ĐT, **Application Status** (Active / Rejected / Hired), **Current Stage** (pipeline stage hiện tại), **Latest Round Result** (IN_PROGRESS / PASSED / FAILED nếu có), và Điểm AI (nếu có).
  - **Lưu ý:** Application Status ≠ Current Stage ≠ Round Result. Phải hiển thị rõ 3 thông tin này.

- **Kịch bản 2: HR xem các Tab thông tin trong Drawer**
  - **VỚI ĐIỀU KIỆN** Drawer đang mở.
  - **KHI** HR chuyển đổi qua lại giữa các Tab (Hồ sơ, Đánh giá, Lịch phỏng vấn, Lịch sử Email).
  - **THÌ** hệ thống tải và hiển thị dữ liệu tương ứng của ứng viên đó trong từng tab:
    - Tab **Hồ sơ**: Nút xem PDF CV (in-app preview hoặc tab mới) và câu trả lời các câu hỏi phụ.
    - Tab **Đánh giá**: Form đánh giá và lịch sử.
    - Tab **Lịch phỏng vấn**: Thông tin lịch hẹn.
    - Tab **Email**: Các email đã gửi.

- **Kịch bản 3: HR thực hiện Action từ Drawer**
  - **VỚI ĐIỀU KIỆN** Drawer đang mở.
  - **KHI** HR nhấn vào các nút chức năng (Đổi vòng, Đánh dấu Đạt, Đánh dấu Trượt).
  - **THÌ** hệ thống xử lý logic tương ứng, hiển thị thông báo thành công và cập nhật lại thông tin hiển thị trên Header của Drawer cũng như trên bảng/kanban bên dưới.

- **Kịch bản 4: HR đóng Drawer**
  - **VỚI ĐIỀU KIỆN** Drawer đang mở.
  - **KHI** HR nhấn nút "X", hoặc click ra ngoài vùng xám (backdrop).
  - **THÌ** Drawer trượt đóng lại, màn hình Kanban/List phía dưới không thay đổi vị trí cuộn ban đầu.

## 3. NGOÀI PHẠM VI
- **KHÔNG** có tính năng "Preview PDF" trực tiếp nhúng vào Drawer nếu trình duyệt không hỗ trợ iframe PDF chuẩn (chấp nhận mở tab mới).
- **KHÔNG** hỗ trợ tính năng Chat trực tuyến với ứng viên trong Drawer.
