# 📋 User Story 19: Phản Hồi Lịch Phỏng Vấn Công Khai (Public Interview Response)

*(Ghi chú: User Story này bị trùng lặp với User Story 30 về tính năng. Trong hệ thống tài liệu, Story 19 và Story 30 nói về cùng một chức năng phản hồi của ứng viên. Ở đây, tôi sẽ viết lại theo một góc nhìn kỹ thuật hơn về luồng token công khai để bổ sung).*

## 1. MÔ TẢ USER STORY
- **As a** Ứng viên (Candidate),
- **I want to** click vào link trong email để phản hồi Confirm/Decline, hệ thống tự động xác thực và cập nhật mà không bắt tôi đăng nhập,
- **So that** tôi có trải nghiệm phản hồi một chạm (one-click response).
- **Story Points:** 2

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Xác thực mã token bảo mật từ email**
  - **GIVEN** ứng viên nhận được email lịch phỏng vấn chứa hai đường link `.../respond?token={jwt}&action=confirm`.
  - **WHEN** ứng viên nhấp vào link "Xác nhận".
  - **THEN** Frontend gọi API `POST /api/v1/public/interviews/respond` với body `{token, action: "confirm"}`.
  - Backend sử dụng secret key để decode JWT token (chứa `interview_id` và `candidate_id`), verify token hợp lệ, chưa hết hạn, và đúng định dạng.
  - Trả về status 200 OK. Frontend hiển thị thông báo "Xác nhận thành công".

- **Scenario 2: Token bị chỉnh sửa (Tampered Token)**
  - **GIVEN** ứng viên hoặc ai đó cố gắng sửa giá trị của biến `token` trên URL.
  - **WHEN** ứng viên tải trang phản hồi.
  - **THEN** Backend decode thất bại (Signature Invalid), trả về 403 Forbidden.
  - Frontend hiển thị trang lỗi "Liên kết không hợp lệ hoặc đã bị chỉnh sửa".

- **Scenario 3: Xử lý lý do từ chối (Decline Reason)**
  - **GIVEN** ứng viên click link có `action=decline`.
  - **WHEN** trang hiển thị lên, ứng viên thấy textbox tùy chọn "Lý do (không bắt buộc)". Ứng viên nhập lý do và bấm Gửi.
  - **THEN** Backend lưu trữ lý do này vào cột `decline_reason` của bảng `interview_schedules`, để HR có thể đọc được trong Drawer.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** cho phép ứng viên đổi lại phản hồi (Confirm xong lại Decline). Phản hồi đầu tiên là phản hồi cuối cùng (Trừ khi HR set lại lịch mới).
