# 📋 User Story 09: Xem & Chỉnh Sửa Job (View & Edit Job)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** xem lại thông tin chi tiết của một tin tuyển dụng đã tạo và chỉnh sửa nó khi cần thiết,
- **So that** tôi có thể cập nhật nội dung JD, thay đổi mức lương hoặc ngày hết hạn nếu có sự thay đổi từ yêu cầu tuyển dụng.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR xem chi tiết Job**
  - **GIVEN** HR đang ở danh sách Job.
  - **WHEN** HR click vào tiêu đề của một Job hoặc chọn "Chỉnh sửa" từ menu.
  - **THEN** hệ thống chuyển đến màn hình `/dashboard/jobs/{job_id}/edit` hiển thị đầy đủ thông tin hiện tại của Job đó trên form.

- **Scenario 2: HR chỉnh sửa và lưu thành công**
  - **GIVEN** HR đang ở màn hình chỉnh sửa Job.
  - **WHEN** HR thay đổi một số thông tin (ví dụ: mô tả, ngày hết hạn) và nhấn "Cập nhật".
  - **THEN** hệ thống gọi API `PUT /api/v1/jobs/{job_id}`, validate dữ liệu và cập nhật database.
  - Hiển thị toast thông báo "Cập nhật thành công!".

- **Scenario 3: HR chỉnh sửa Job đang ACTIVE**
  - **GIVEN** Job đang có trạng thái `ACTIVE` (đã hiển thị công khai).
  - **WHEN** HR chỉnh sửa và lưu lại.
  - **THEN** thông tin trên trang Career Site thay đổi ngay lập tức (không cần unpublish). Cảnh báo nhỏ xuất hiện báo cho HR biết thay đổi sẽ hiển thị public ngay.

- **Scenario 4: HR cố gắng chỉnh sửa Job đã CLOSED**
  - **GIVEN** Job đang có trạng thái `CLOSED`.
  - **WHEN** HR mở trang chỉnh sửa.
  - **THEN** toàn bộ form ở trạng thái "Read-only" (không thể sửa). Nút "Cập nhật" bị ẩn. Hiển thị thông báo: _"Job này đã đóng, không thể chỉnh sửa."_

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** theo dõi lịch sử chỉnh sửa (version history) của Job – chỉ lưu dữ liệu mới nhất.
- Chỉnh sửa Form ứng tuyển và Cấu hình Pipeline thuộc các User Story riêng biệt.
