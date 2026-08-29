# 📋 User Story 15: List View Ứng Viên (Xem Danh Sách Dạng Bảng)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** xem danh sách toàn bộ ứng viên của một Job dưới dạng Bảng (Data Table) song song với Kanban Board,
- **So that** tôi có thể dễ dàng sắp xếp, tìm kiếm, lọc dữ liệu hàng loạt và xem các thông tin chi tiết (Email, Số ĐT, Ngày nộp) mà Kanban Board không hiển thị hết.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR chuyển đổi giữa Kanban và List View**
  - **GIVEN** HR đang xem quản lý ứng viên của một Job (mặc định là Kanban).
  - **WHEN** HR nhấn vào nút Toggle "Dạng bảng" (List View).
  - **THEN** giao diện chuyển từ Kanban sang Bảng dữ liệu mà không cần tải lại trang toàn bộ.
  - Bảng hiển thị các cột: Họ tên, Email, SĐT, Vòng hiện tại, Trạng thái (Mới/Đang xử lý/Đạt/Không đạt), AI Score, Ngày nộp đơn.

- **Scenario 2: Sắp xếp (Sorting) ứng viên trong bảng**
  - **GIVEN** HR đang ở chế độ List View.
  - **WHEN** HR nhấn vào tiêu đề cột "Ngày nộp đơn" hoặc "AI Score".
  - **THEN** danh sách ứng viên được sắp xếp lại tương ứng (Tăng dần / Giảm dần).

- **Scenario 3: Lọc dữ liệu trên List View**
  - **GIVEN** HR đang xem bảng ứng viên.
  - **WHEN** HR chọn bộ lọc "Vòng hiện tại: Phỏng vấn" hoặc "Trạng thái: Không đạt".
  - **THEN** bảng chỉ hiển thị những ứng viên thỏa mãn điều kiện lọc.

- **Scenario 4: Truy cập chi tiết ứng viên từ bảng**
  - **GIVEN** HR đang xem List View.
  - **WHEN** HR click vào hàng của một ứng viên.
  - **THEN** hệ thống mở Candidate Drawer từ cạnh phải màn hình hiển thị toàn bộ thông tin chi tiết của người đó.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ chỉnh sửa thông tin ứng viên trực tiếp (inline-edit) trên các ô của bảng dữ liệu.
- **KHÔNG** hỗ trợ "Bulk Actions" (chọn nhiều row bằng checkbox để xóa, gửi email hàng loạt) trong phiên bản này.
