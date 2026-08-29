# 📋 User Story 07: Xem Danh Sách Job (Job List Management)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** xem và quản lý danh sách tất cả các tin tuyển dụng (Jobs) của công ty mình,
- **So that** tôi có thể dễ dàng tìm kiếm, lọc, và theo dõi trạng thái của từng chiến dịch tuyển dụng.
- **Story part:** 2

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR xem danh sách Job mặc định**
  - **GIVEN** HR đã đăng nhập thành công.
  - **WHEN** HR truy cập `/dashboard/jobs`.
  - **THEN** hệ thống hiển thị dạng bảng (Table view) các Job của công ty, sắp xếp theo ngày tạo mới nhất. Các cột hiển thị: Tiêu đề Job, Trạng thái (Draft/Active/Closed), Ngày tạo, Ngày hết hạn, Số lượng ứng viên, và Cột Hành động.

- **Scenario 2: HR lọc và tìm kiếm Job**
  - **GIVEN** HR đang ở trang danh sách Job.
  - **WHEN** HR nhập từ khóa vào ô tìm kiếm (tiêu đề Job) hoặc chọn bộ lọc trạng thái (ví dụ: chỉ hiện Active Jobs).
  - **THEN** bảng dữ liệu ngay lập tức (hoặc sau khi enter/click) cập nhật hiển thị các Job khớp với điều kiện lọc.

- **Scenario 3: HR thực hiện thao tác nhanh (Quick Actions)**
  - **GIVEN** HR đang xem một dòng Job trong bảng.
  - **WHEN** HR nhấn vào nút "..." (More options).
  - **THEN** hiển thị dropdown với các tùy chọn: Xem chi tiết (Kanban ứng viên), Chỉnh sửa Job, Sao chép (Duplicate) Job, Đóng Job (Close), Xóa (chỉ hiển thị nếu Job đang là Draft).

- **Scenario 4: Phân trang (Pagination)**
  - **GIVEN** công ty có hơn 10 Jobs.
  - **WHEN** HR cuộn xuống cuối bảng.
  - **THEN** hiển thị các nút phân trang (1, 2, 3...) hoặc nút "Tải thêm", cho phép xem các trang dữ liệu tiếp theo.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ thao tác hàng loạt (Bulk actions - ví dụ chọn nhiều Job để xóa/đóng cùng lúc) trong phiên bản này.
- **KHÔNG** xuất (Export) danh sách Job ra file Excel/PDF.
