# 📋 User Story 10: Publish/Unpublish Job (Đăng/Gỡ Tin Tuyển Dụng)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** thay đổi trạng thái của tin tuyển dụng giữa Publish (Công khai) và Unpublish (Gỡ xuống),
- **So that** tôi có thể kiểm soát việc ứng viên có nhìn thấy tin tuyển dụng trên Career Site và nộp đơn được hay không.
- **Story Points:** 2

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR Publish một Job đang là Draft**
  - **GIVEN** Job đang ở trạng thái `DRAFT` và đã điền đầy đủ các thông tin bắt buộc.
  - **WHEN** HR nhấn nút "Publish".
  - **THEN** hệ thống cập nhật `jobs.status = ACTIVE` và gán `published_at = now()`.
  - Job ngay lập tức hiển thị trên Career Site public của công ty.

- **Scenario 2: HR không thể Publish nếu thiếu thông tin bắt buộc**
  - **GIVEN** Job đang là `DRAFT` nhưng thiếu trường Tiêu đề hoặc Mô tả.
  - **WHEN** HR nhấn "Publish".
  - **THEN** hệ thống ngăn chặn và hiển thị lỗi: _"Vui lòng điền đầy đủ các thông tin bắt buộc (Tiêu đề, Mô tả) trước khi Publish."_

- **Scenario 3: HR Unpublish / Đóng một Job đang Active**
  - **GIVEN** Job đang ở trạng thái `ACTIVE`.
  - **WHEN** HR nhấn nút "Đóng Job" (Close).
  - **THEN** hệ thống cập nhật `jobs.status = CLOSED`.
  - Job biến mất khỏi Career Site (ứng viên truy cập link cũ sẽ thấy thông báo "Tin tuyển dụng này đã đóng").
  - Ứng viên **không thể** nộp CV mới vào Job này, nhưng HR vẫn có thể quản lý các ứng viên đã nộp trong Kanban.

- **Scenario 4: Mở lại Job đã Đóng**
  - **GIVEN** Job đang ở trạng thái `CLOSED`.
  - **WHEN** HR nhấn "Mở lại Job" (Re-open).
  - **THEN** hệ thống cập nhật `jobs.status = ACTIVE` và Job lại xuất hiện trên Career Site.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** tự động đăng Job lên các nền tảng tuyển dụng bên ngoài (VietnamWorks, TopCV) - chỉ publish lên Career Site của EasyTech.
- Hẹn giờ tự động Publish (Schedule Publish) không nằm trong phiên bản này.
