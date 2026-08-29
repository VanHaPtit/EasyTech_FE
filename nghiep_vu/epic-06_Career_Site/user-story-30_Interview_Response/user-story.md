# 📋 User Story 30: Interview Response (Phản Hồi Lịch Phỏng Vấn Qua Email)

## 1. MÔ TẢ USER STORY
- **As a** Ứng viên (Candidate),
- **I want to** nhận email thông báo lịch phỏng vấn và xác nhận hoặc từ chối tham gia chỉ bằng một cú nhấp (one-click),
- **So that** tôi không cần đăng nhập vào hệ thống mà vẫn có thể phản hồi lịch hẹn nhanh chóng, còn HR nhận được phản hồi ngay lập tức.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Ứng viên nhận email và xác nhận tham dự phỏng vấn**
  - **GIVEN** HR đã tạo lịch phỏng vấn cho ứng viên trong hệ thống, hệ thống đã gửi email chứa hai nút: "✅ Xác nhận tham dự" và "❌ Từ chối".
  - **WHEN** ứng viên nhấn nút "✅ Xác nhận tham dự" trong email.
  - **THEN** trình duyệt mở trang `/careers/interview/respond?token={token}&action=confirm`.
  - Backend xác minh token, cập nhật `interview_schedules.candidate_response = CONFIRMED` và `responded_at = now()`.
  - Trang hiển thị: _"Cảm ơn! Bạn đã xác nhận tham dự phỏng vấn vào [ngày giờ] tại [địa điểm/link meet]."_
  - Hệ thống gửi email xác nhận lại (reminder) đến ứng viên và thông báo cho HR qua notification.

- **Scenario 2: Ứng viên từ chối lịch phỏng vấn**
  - **GIVEN** ứng viên đã nhận email thông báo lịch phỏng vấn.
  - **WHEN** ứng viên nhấn nút "❌ Từ chối" trong email.
  - **THEN** trình duyệt mở trang `/careers/interview/respond?token={token}&action=decline`.
  - Trang hiển thị form ngắn yêu cầu ứng viên nhập lý do từ chối (optional, textarea).
  - Sau khi ứng viên nhấn "Gửi phản hồi": hệ thống cập nhật `candidate_response = DECLINED` và lưu lý do.
  - Hệ thống gửi thông báo đến HR để HR chủ động liên hệ lại hoặc xếp lịch mới.

- **Scenario 3: Ứng viên nhấn link phản hồi đã hết hạn**
  - **GIVEN** token phản hồi trong email đã quá 24 giờ trước thời gian phỏng vấn.
  - **WHEN** ứng viên nhấn vào nút trong email.
  - **THEN** trang hiển thị: _"Thời hạn phản hồi đã hết. Vui lòng liên hệ trực tiếp với nhà tuyển dụng."_ kèm thông tin email/số điện thoại liên hệ của HR.

- **Scenario 4: HR xem trạng thái phản hồi của ứng viên**
  - **GIVEN** HR đã gửi lịch phỏng vấn cho ứng viên.
  - **WHEN** HR mở Candidate Drawer hoặc xem danh sách lịch phỏng vấn.
  - **THEN** hệ thống hiển thị badge trạng thái: **Chờ phản hồi** (PENDING) / **Đã xác nhận** (CONFIRMED) / **Đã từ chối** (DECLINED), cùng thời gian phản hồi.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ ứng viên tự đề xuất khung giờ thay thế (chỉ Confirm hoặc Decline).
- **KHÔNG** tự động tạo lịch phỏng vấn thay thế khi ứng viên từ chối (HR phải tự tạo lại).
- **KHÔNG** tích hợp Google Calendar hoặc Outlook Calendar trong phiên bản này.
