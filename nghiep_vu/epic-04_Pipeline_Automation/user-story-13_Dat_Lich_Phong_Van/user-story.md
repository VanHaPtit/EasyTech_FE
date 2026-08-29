# 📋 User Story 13: Đặt Lịch Phỏng Vấn (Interview Scheduling)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** tạo và gửi lịch phỏng vấn đến ứng viên trực tiếp từ giao diện quản trị,
- **So that** ứng viên nhận được thông tin lịch hẹn đầy đủ qua email và có thể xác nhận/từ chối nhanh chóng mà không cần giao tiếp qua các kênh ngoài hệ thống.
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR tạo lịch phỏng vấn cho ứng viên**
  - **GIVEN** HR đang xem Candidate Drawer của một ứng viên đang ở vòng phỏng vấn, ứng viên chưa có lịch phỏng vấn nào được xếp.
  - **WHEN** HR nhấn nút "Đặt lịch phỏng vấn" và điền thông tin: Ngày giờ, hình thức (Trực tiếp / Online qua Google Meet / Zoom), địa điểm hoặc link meet, ghi chú thêm.
  - **THEN** hệ thống lưu lịch vào bảng `interview_schedules` với `status = SCHEDULED` và gửi email thông báo đến ứng viên chứa đầy đủ thông tin + 2 nút phản hồi (Xác nhận / Từ chối).

- **Scenario 2: HR chỉnh sửa lịch phỏng vấn đã tạo**
  - **GIVEN** ứng viên đã có lịch phỏng vấn với trạng thái `SCHEDULED` hoặc `CONFIRMED`.
  - **WHEN** HR nhấn "Chỉnh sửa lịch" và thay đổi ngày giờ hoặc địa điểm.
  - **THEN** hệ thống cập nhật bản ghi `interview_schedules` và gửi email thông báo thay đổi lịch đến ứng viên.
  - Trạng thái phản hồi ứng viên reset về `PENDING` (vì lịch đã thay đổi).

- **Scenario 3: Xem lịch phỏng vấn trong Candidate Drawer**
  - **GIVEN** ứng viên đã có lịch phỏng vấn được tạo.
  - **WHEN** HR mở Candidate Drawer.
  - **THEN** section "Lịch phỏng vấn" hiển thị: ngày giờ, hình thức, địa điểm/link, và trạng thái phản hồi của ứng viên (Chờ phản hồi / Đã xác nhận / Đã từ chối).

- **Scenario 4: Ứng viên từ chối và HR cần xếp lịch mới**
  - **GIVEN** ứng viên đã nhấn "Từ chối" trong email phỏng vấn, trạng thái `candidate_response = DECLINED`.
  - **WHEN** HR nhận thông báo và muốn xếp lịch mới.
  - **THEN** HR có thể nhấn "Tạo lịch mới" từ Candidate Drawer, lịch cũ lưu trong lịch sử với trạng thái `DECLINED`, lịch mới được tạo với trạng thái `SCHEDULED`.

- **Scenario 5: Validate ngày giờ phỏng vấn**
  - **GIVEN** HR đang điền form tạo lịch phỏng vấn.
  - **WHEN** HR chọn ngày giờ trong quá khứ hoặc trong vòng 2 giờ tới.
  - **THEN** hệ thống hiển thị thông báo lỗi: _"Ngày giờ phỏng vấn phải cách hiện tại ít nhất 2 giờ."_ và không cho phép lưu.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** tích hợp Google Calendar hoặc Outlook để tự động tạo sự kiện calendar trong phiên bản này.
- **KHÔNG** hỗ trợ phỏng vấn nhóm (nhiều ứng viên cùng lúc).
- **KHÔNG** gửi reminder tự động trước giờ phỏng vấn trong phiên bản này.
