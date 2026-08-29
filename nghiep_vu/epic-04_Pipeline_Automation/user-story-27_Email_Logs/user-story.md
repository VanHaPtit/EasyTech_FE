# 📋 User Story 27: Email Logs (Lịch Sử Email Tự Động Gửi Đến Ứng Viên)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** xem toàn bộ lịch sử email hệ thống đã tự động gửi đến từng ứng viên,
- **So that** tôi có thể kiểm tra xem ứng viên đã được thông báo chưa, phát hiện email gửi lỗi và gửi lại nếu cần thiết.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR xem lịch sử email từ Candidate Drawer**
  - **GIVEN** HR đang xem thông tin chi tiết ứng viên trong Candidate Drawer.
  - **WHEN** HR chuyển sang tab "Lịch sử Email".
  - **THEN** hệ thống hiển thị danh sách tất cả email đã gửi đến ứng viên đó, sắp xếp theo thời gian giảm dần, bao gồm:
    - Tiêu đề email (subject)
    - Loại email (template_name: Xác nhận nộp đơn, Mời phỏng vấn, Kết quả,...)
    - Thời gian gửi (`sent_at`)
    - Trạng thái gửi: `SUCCESS` (✅) hoặc `FAILED` (❌)

- **Scenario 2: HR xem lịch sử email toàn bộ hệ thống (Email Logs)**
  - **GIVEN** HR truy cập trang `/dashboard/email-logs`.
  - **WHEN** trang được tải.
  - **THEN** hệ thống hiển thị bảng danh sách tất cả email đã gửi của company (giới hạn 50 bản ghi gần nhất mặc định) với các cột: Người nhận, Tiêu đề, Template sử dụng, Thời gian gửi, Trạng thái.
  - HR có thể lọc theo khoảng thời gian, theo trạng thái (SUCCESS / FAILED), theo loại template.

- **Scenario 3: Gửi lại email thất bại**
  - **GIVEN** một bản ghi email trong danh sách có trạng thái `FAILED`.
  - **WHEN** HR nhấn nút "Gửi lại" (Retry) trên bản ghi đó.
  - **THEN** hệ thống thực hiện gửi lại email sử dụng cùng template và nội dung gốc.
  - Nếu gửi lại thành công: cập nhật trạng thái thành `SUCCESS` và ghi nhận thời gian gửi lại.
  - Nếu gửi lại thất bại (lần 2): hiển thị thông báo lỗi cụ thể (ví dụ: _"Email ứng viên không tồn tại"_, _"Dịch vụ SMTP không khả dụng"_).

- **Scenario 4: Xem nội dung email đã gửi**
  - **GIVEN** HR muốn kiểm tra nội dung cụ thể của một email đã gửi.
  - **WHEN** HR nhấn vào tiêu đề email trong danh sách.
  - **THEN** hệ thống mở popup hiển thị nội dung HTML đầy đủ của email đó (preview chế độ read-only).

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** theo dõi trạng thái email phía ứng viên (Open rate, Click rate) trong phiên bản này.
- **KHÔNG** lưu trữ email logs quá 90 ngày (dữ liệu cũ hơn sẽ bị tự động xóa bởi cron job).
- **KHÔNG** hỗ trợ xuất (Export) lịch sử email ra file CSV/Excel trong phiên bản này.
