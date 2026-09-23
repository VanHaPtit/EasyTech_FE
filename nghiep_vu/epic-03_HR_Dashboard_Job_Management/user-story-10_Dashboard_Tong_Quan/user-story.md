# 📋 User Story 10: Dashboard Tổng Quan (HR Dashboard Overview)

## 1. MÔ TẢ USER STORY
- **Là** Nhà tuyển dụng (HR),
- **Tôi muốn** xem trang tổng quan (Dashboard) ngay khi đăng nhập, hiển thị các số liệu thống kê chính và công việc cần làm,
- **Để** tôi có thể nắm bắt nhanh tình hình tuyển dụng của công ty và biết mình cần ưu tiên xử lý việc gì trong ngày.
- **Story Points:** 3

## SƠ ĐỒ LUỒNG NGHIỆP VỤ (Business Flow)

```mermaid
graph TD
    A[Đăng nhập HR] --> B[Tải Dashboard]
    B --> C[Fetch Stats: Ứng viên, Trạng thái hồ sơ]
    B --> D[Fetch Biểu đồ Xu hướng]
    B --> E[Fetch Hiệu quả tuyển dụng & Top Jobs]
    C --> F[Hiển thị UI tổng quan]
    D --> F
    E --> F
```

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: HR xem các thẻ số liệu thống kê (Metric Cards)**
  - **VỚI ĐIỀU KIỆN** HR đăng nhập vào hệ thống.
  - **KHI** HR truy cập `/dashboard`.
  - **THÌ** hệ thống hiển thị 4 thẻ số liệu của công ty (theo bộ lọc thời gian mặc định: 30 ngày qua):
    1. Tổng số ứng viên (kèm % thay đổi)
    2. Đang xử lý (số lượng và % so với tổng)
    3. Đạt (số lượng và % so với tổng)
    4. Không đạt (số lượng và % so với tổng)

- **Kịch bản 2: HR xem biểu đồ xu hướng ứng tuyển**
  - **VỚI ĐIỀU KIỆN** HR đang ở trang Dashboard.
  - **KHI** cuộn xuống phần biểu đồ.
  - **THÌ** hiển thị biểu đồ đường (Line Chart) thể hiện số lượng đơn ứng tuyển nhận được theo từng ngày trong 30 ngày qua.

- **Kịch bản 3: HR xem Hiệu quả tuyển dụng và Tin nổi bật**
  - **VỚI ĐIỀU KIỆN** HR đang ở trang Dashboard.
  - **KHI** xem panel bên phải và bên dưới.
  - **THÌ** hiển thị:
    - 4 Thẻ hiệu quả tuyển dụng: Tỷ lệ chuyển đổi, Thời gian tuyển dụng TB, Nguồn ứng viên hiệu quả, Tỷ lệ chấp nhận offer.
    - Bảng Top 4 Tin tuyển dụng nổi bật: Vị trí, Phòng ban, Địa điểm, Số ứng viên, Trạng thái.

- **Kịch bản 4: Lọc dữ liệu Dashboard theo thời gian**
  - **VỚI ĐIỀU KIỆN** HR đang ở trang Dashboard.
  - **KHI** HR chọn khoảng thời gian từ dropdown (7 ngày qua, 30 ngày qua, Tháng này, Năm nay).
  - **THÌ** các số liệu và biểu đồ tự động cập nhật theo khoảng thời gian được chọn.

## 3. NGOÀI PHẠM VI
- **KHÔNG** hỗ trợ HR tự custom giao diện Dashboard (kéo thả các widget) trong phiên bản này.
- **KHÔNG** hiển thị dữ liệu của công ty khác (bảo đảm multi-tenant).
