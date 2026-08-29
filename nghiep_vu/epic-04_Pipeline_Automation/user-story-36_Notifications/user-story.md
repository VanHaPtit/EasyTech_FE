# 📋 User Story 36: Hệ Thống Thông Báo (In-App Notifications)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** nhận thông báo trong ứng dụng (in-app notifications) ngay khi có sự kiện quan trọng xảy ra trong hệ thống,
- **So that** tôi có thể phản hồi kịp thời với ứng viên mới, không bỏ lỡ phản hồi lịch phỏng vấn, và luôn nắm bắt được tiến độ tuyển dụng mà không cần liên tục reload trang.
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR nhận thông báo khi có ứng viên mới nộp đơn**
  - **GIVEN** Career Site của công ty đang hoạt động và có ứng viên nộp đơn vào một Job đang `ACTIVE`.
  - **WHEN** ứng viên hoàn thành nộp đơn thành công.
  - **THEN** hệ thống tạo một bản ghi notification trong bảng `notifications` với:
    - `type = NEW_APPLICATION`
    - `title = "Ứng viên mới: {tên ứng viên} vừa nộp đơn vào {tên Job}"`
    - `recipient_id = {hr_user_id}` (tất cả HR thuộc company)
    - `entity_type = APPLICATION`, `entity_id = {application_id}`
  - Biểu tượng chuông 🔔 trên Sidebar hiển thị badge số thông báo chưa đọc (unread count) tăng lên 1.
  - Khi HR nhấn vào notification, hệ thống điều hướng đến Candidate Drawer của ứng viên vừa nộp.

- **Scenario 2: HR nhận thông báo khi ứng viên xác nhận hoặc từ chối lịch phỏng vấn**
  - **GIVEN** HR đã gửi lịch phỏng vấn cho ứng viên.
  - **WHEN** ứng viên nhấn "Xác nhận" hoặc "Từ chối" qua link trong email.
  - **THEN** hệ thống tạo notification:
    - **Xác nhận**: `"Ứng viên {tên} đã XÁC NHẬN tham dự phỏng vấn vào {ngày giờ}."`
    - **Từ chối**: `"Ứng viên {tên} đã TỪ CHỐI lịch phỏng vấn vào {ngày giờ}. Lý do: {lý do nếu có}."`
  - Notification hiển thị trong Inbox của HR với màu phân biệt (xanh lá = xác nhận, đỏ = từ chối).

- **Scenario 3: HR xem danh sách tất cả thông báo**
  - **GIVEN** HR nhấn vào biểu tượng chuông 🔔 trên Sidebar.
  - **WHEN** panel thông báo mở ra (hoặc điều hướng đến `/dashboard/notifications`).
  - **THEN** hệ thống hiển thị danh sách tất cả thông báo sắp xếp theo thời gian giảm dần, phân nhóm: "Hôm nay", "Hôm qua", "Tuần trước".
  - Thông báo chưa đọc có nền màu nhạt khác biệt với thông báo đã đọc.
  - Mỗi thông báo hiển thị: loại sự kiện, nội dung tóm tắt, thời gian tương đối (ví dụ: "5 phút trước").

- **Scenario 4: HR đánh dấu tất cả thông báo là đã đọc**
  - **GIVEN** HR có nhiều thông báo chưa đọc.
  - **WHEN** HR nhấn nút "Đánh dấu tất cả là đã đọc".
  - **THEN** hệ thống cập nhật `notifications.is_read = true` cho tất cả thông báo của HR đó.
  - Badge số chưa đọc trên biểu tượng chuông về 0.

- **Scenario 5: HR nhận thông báo khi Job sắp hết hạn**
  - **GIVEN** một Job đang `ACTIVE` có trường `deadline` và còn 3 ngày đến ngày hết hạn.
  - **WHEN** Cron job chạy vào 8:00 sáng mỗi ngày.
  - **THEN** hệ thống tạo notification: `"Job '{tên Job}' sẽ hết hạn sau 3 ngày (vào {ngày}). Nhấn để gia hạn hoặc đóng Job."` và gửi kèm email nhắc nhở đến HR.

- **Scenario 6: Phân quyền - HR chỉ nhận thông báo của công ty mình**
  - **GIVEN** hệ thống có nhiều công ty (multi-tenant).
  - **WHEN** ứng viên nộp đơn vào Job của Công ty A.
  - **THEN** chỉ HR thuộc `company_id = A` nhận được thông báo. HR của công ty B **không** nhận thông báo này.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ thông báo real-time qua WebSocket/SSE trong phiên bản này – sử dụng polling 30 giây.
- **KHÔNG** hỗ trợ thông báo push (push notification trên mobile/desktop browser).
- **KHÔNG** lưu trữ notifications quá 90 ngày (cron job tự xóa dữ liệu cũ).
- Ứng viên **KHÔNG** nhận in-app notification – chỉ nhận qua email.
