# 📋 User Story 11: Cấu Hình Pipeline Tuyển Dụng (Hiring Rounds Configuration)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** tùy chỉnh các vòng tuyển dụng (Hiring Rounds) riêng cho từng tin tuyển dụng,
- **So that** tôi có thể thiết kế quy trình phỏng vấn linh hoạt phù hợp với đặc thù từng vị trí (ví dụ: vị trí kỹ thuật cần thêm vòng Technical Test, vị trí senior cần thêm vòng Culture Fit).
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR thêm vòng tuyển dụng cho Job**
  - **GIVEN** HR đang ở màn hình chỉnh sửa Job (`/dashboard/jobs/{job_id}/edit`), section "Cấu hình Pipeline".
  - **WHEN** HR nhấn nút "Thêm vòng" và điền thông tin: Tên vòng (ví dụ: _CV Screening_, _Technical Test_, _Phỏng vấn HR_), loại vòng (SCREENING / INTERVIEW / TEST), gắn Email Template tự động gửi khi pass vòng.
  - **THEN** hệ thống lưu vòng mới vào bảng `hiring_rounds` với `job_id` tương ứng và `order_index` tự động gán cuối danh sách.
  - Danh sách vòng hiện tại cập nhật ngay, hiển thị đủ thông tin vòng vừa tạo.

- **Scenario 2: HR sắp xếp lại thứ tự vòng bằng Drag & Drop**
  - **GIVEN** HR đã có ít nhất 2 vòng tuyển dụng trong danh sách.
  - **WHEN** HR kéo-thả để thay đổi vị trí của một vòng.
  - **THEN** hệ thống gọi API `PUT /api/v1/jobs/{job_id}/rounds/reorder` với payload `{ "ordered_ids": ["uuid1", "uuid2", ...] }`.
  - Kanban Board tự động cập nhật thứ tự cột tương ứng.

- **Scenario 3: HR chỉnh sửa thông tin một vòng tuyển dụng**
  - **GIVEN** HR muốn thay đổi tên vòng hoặc email template gắn với vòng.
  - **WHEN** HR nhấn icon "Sửa" trên vòng tương ứng và lưu.
  - **THEN** hệ thống cập nhật bản ghi `hiring_rounds` và mọi đơn ứng tuyển đang ở vòng đó giữ nguyên trạng thái.

- **Scenario 4: HR xóa một vòng tuyển dụng**
  - **GIVEN** một vòng tuyển dụng đang tồn tại trong Job.
  - **WHEN** HR nhấn nút "Xóa" trên vòng đó.
  - **THEN** nếu vòng **chưa có ứng viên nào**: hệ thống xóa ngay và cập nhật lại `order_index` của các vòng còn lại.
  - Nếu vòng **đã có ứng viên**: hệ thống hiển thị cảnh báo: _"Vòng này đang có {n} ứng viên. Bạn cần chuyển họ sang vòng khác trước khi xóa."_ và không thực hiện xóa.

- **Scenario 5: Job được publish mà không có vòng nào**
  - **GIVEN** HR tạo Job nhưng chưa cấu hình vòng tuyển dụng.
  - **WHEN** HR nhấn "Publish".
  - **THEN** hệ thống hiển thị cảnh báo nhắc nhở: _"Job chưa có vòng tuyển dụng. Hệ thống sẽ dùng cấu hình tối giản (Mới → Đang xử lý → Kết thúc). Bạn có muốn tiếp tục không?"_

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ chia sẻ template pipeline giữa các Job trong phiên bản này (copy pipeline từ job khác).
- **KHÔNG** giới hạn số lượng vòng tối đa (HR có thể tạo bao nhiêu vòng tùy ý).
- **KHÔNG** hỗ trợ vòng song song (parallel rounds) – tất cả vòng là tuần tự.
