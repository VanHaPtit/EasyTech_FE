# 📋 User Story 17: Xem Career Site & Job Công Khai

## 1. MÔ TẢ USER STORY
- **As a** Ứng viên (Candidate) / Khách truy cập ẩn danh (Guest),
- **I want to** truy cập vào trang Career Site của một công ty và xem danh sách các tin tuyển dụng đang mở,
- **So that** tôi có thể tìm hiểu về công ty, văn hóa và tìm kiếm vị trí công việc phù hợp để nộp đơn.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Ứng viên truy cập Career Site của công ty**
  - **GIVEN** một công ty đã thiết lập Career Site (đã publish).
  - **WHEN** ứng viên truy cập URL `/careers/{company_slug}`.
  - **THEN** hệ thống tải trang Career Site với:
    - Giao diện (Logo, Banner, Primary Color) đã được HR cấu hình.
    - Tên công ty, Slogan và Mô tả.
    - Danh sách các Job đang ở trạng thái `ACTIVE`. (Job `CLOSED` hoặc `DRAFT` không hiển thị).

- **Scenario 2: Lọc và tìm kiếm Job trên Career Site**
  - **GIVEN** ứng viên đang xem trang Career Site của công ty.
  - **WHEN** ứng viên nhập từ khóa vào ô tìm kiếm hoặc lọc theo Danh mục (Categories).
  - **THEN** danh sách Job bên dưới hiển thị ngay kết quả khớp (Client-side hoặc Server-side filtering), giúp ứng viên tìm nhanh vị trí phù hợp.

- **Scenario 3: Ứng viên xem chi tiết một tin tuyển dụng (JD)**
  - **GIVEN** ứng viên thấy một Job quan tâm trên Career Site.
  - **WHEN** ứng viên click vào tên Job đó.
  - **THEN** hệ thống chuyển đến URL `/careers/{company_slug}/jobs/{job_id}`.
  - Trang chi tiết hiển thị: Tiêu đề công việc, Mức lương, Địa điểm, Loại hình và toàn bộ nội dung Mô tả công việc (Rich text).
  - Luôn có nút "Ứng tuyển ngay" (Apply Now) ghim ở vị trí dễ thấy (sticky header/bottom).

- **Scenario 4: Career Site bị vô hiệu hóa**
  - **GIVEN** HR của công ty đã tắt cờ `is_published` của Career Site.
  - **WHEN** ứng viên truy cập vào `/careers/{company_slug}`.
  - **THEN** hệ thống hiển thị trang lỗi "Công ty hiện không tuyển dụng hoặc trang không khả dụng." và không hiển thị thông tin gì thêm.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ tạo tài khoản Ứng viên (Candidate Portal profile lưu sẵn CV) trong hệ thống này – ứng viên khách vãng lai hoàn toàn (Guest).
- **KHÔNG** có chức năng "Lưu việc làm" (Save Job).
