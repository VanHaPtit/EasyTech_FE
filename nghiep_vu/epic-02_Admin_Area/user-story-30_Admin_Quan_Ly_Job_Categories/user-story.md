# 📋 User Story 30: Admin Quản Lý Job Categories (Danh Mục Ngành Nghề)

## 1. MÔ TẢ USER STORY
- **As a** Quản trị viên Hệ thống (System Admin),
- **I want to** quản lý (thêm, sửa, xóa, sắp xếp) danh mục ngành nghề (Job Categories) được dùng làm từ khóa phân loại cho các tin tuyển dụng,
- **So that** HR của các công ty có thể chọn đúng ngành nghề khi tạo Job, và ứng viên có thể lọc Job theo lĩnh vực quan tâm trên Career Site.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Admin xem danh sách Job Categories**
  - **GIVEN** Admin đang đăng nhập vào Admin Dashboard.
  - **WHEN** Admin truy cập `/admin/job-categories`.
  - **THEN** hệ thống hiển thị bảng danh sách tất cả danh mục ngành nghề, gồm: Tên danh mục, Slug (dùng cho URL), Số Job đang sử dụng, Trạng thái (Active / Inactive), Ngày tạo.

- **Scenario 2: Admin thêm danh mục mới**
  - **GIVEN** Admin ở trang quản lý Job Categories.
  - **WHEN** Admin nhấn "Thêm mới", điền Tên danh mục (ví dụ: "Công nghệ thông tin"), và nhấn "Lưu".
  - **THEN** hệ thống tự động sinh `slug` (ví dụ: `cong-nghe-thong-tin`) và lưu vào database.
  - Nếu Tên danh mục đã tồn tại: hiển thị lỗi "Tên danh mục này đã tồn tại trong hệ thống."

- **Scenario 3: Admin chỉnh sửa danh mục**
  - **GIVEN** một danh mục đang tồn tại trong danh sách.
  - **WHEN** Admin nhấn "Sửa" và thay đổi tên, sau đó lưu.
  - **THEN** hệ thống cập nhật tên và slug mới. Các Job đang sử dụng danh mục này tự động hiển thị tên mới (không cần cập nhật thủ công).

- **Scenario 4: Admin xóa danh mục không còn sử dụng**
  - **GIVEN** một danh mục có 0 Job đang sử dụng.
  - **WHEN** Admin nhấn "Xóa" và xác nhận.
  - **THEN** hệ thống xóa (soft delete) danh mục đó, không hiển thị nữa trong dropdown tạo Job.
  - Nếu danh mục đang được sử dụng bởi ít nhất 1 Job: hiển thị lỗi "Không thể xóa danh mục đang có Job sử dụng."

- **Scenario 5: Admin bật/tắt hiển thị danh mục trên Career Site**
  - **GIVEN** danh mục đang có trạng thái `ACTIVE`.
  - **WHEN** Admin toggle trạng thái sang `INACTIVE`.
  - **THEN** danh mục ẩn khỏi bộ lọc trên Career Site, nhưng vẫn hiển thị trong danh sách Admin và vẫn gắn với các Job cũ.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ phân cấp danh mục (category > subcategory) trong phiên bản này.
- **KHÔNG** cho phép HR tự tạo danh mục – chỉ Admin hệ thống mới có quyền thêm/sửa/xóa.
