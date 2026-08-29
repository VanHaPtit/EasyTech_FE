# 📋 User Story 26: Evaluation Form (Phiếu Đánh Giá Ứng Viên Theo Vòng)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR) / Người phỏng vấn (Interviewer),
- **I want to** điền phiếu đánh giá tiêu chí cho ứng viên sau mỗi vòng phỏng vấn,
- **So that** tôi có thể ghi lại nhận xét có cấu trúc, đưa ra quyết định PASS/FAIL dựa trên dữ liệu và lưu lại lịch sử để tham chiếu sau này.
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR mở phiếu đánh giá từ Candidate Drawer**
  - **GIVEN** HR đang xem thông tin chi tiết ứng viên trong Candidate Drawer, ứng viên đang ở một vòng phỏng vấn cụ thể.
  - **WHEN** HR nhấn nút "Đánh giá vòng này" trong Drawer.
  - **THEN** hệ thống hiển thị form đánh giá gồm các tiêu chí đã được định nghĩa cho vòng đó (lấy từ bảng `form_fields` liên kết với `hiring_round_id`).
  - Mỗi tiêu chí có thang điểm từ 1–5 (hoặc PASS/FAIL tùy cấu hình vòng) và ô nhận xét tự do.

- **Scenario 2: HR hoàn thành đánh giá và đưa ra kết quả**
  - **GIVEN** HR đã điền đầy đủ tất cả các tiêu chí đánh giá bắt buộc.
  - **WHEN** HR nhấn nút "Lưu đánh giá" và chọn kết quả tổng thể (PASS hoặc FAIL).
  - **THEN** hệ thống lưu dữ liệu đánh giá vào bảng `round_statuses` với `status = PASS/FAIL` và `evaluated_by = {user_id}`.
  - Nếu kết quả là **PASS**: hệ thống tự động kích hoạt Email Automation gửi email mời vào vòng tiếp theo.
  - Nếu kết quả là **FAIL**: hệ thống tự động kích hoạt Email Automation gửi email thông báo không tiếp tục.
  - Kanban Board tự động cập nhật vị trí card ứng viên.

- **Scenario 3: Xem lại lịch sử đánh giá**
  - **GIVEN** ứng viên đã được đánh giá qua nhiều vòng.
  - **WHEN** HR mở Candidate Drawer của ứng viên đó.
  - **THEN** tab "Lịch sử đánh giá" hiển thị danh sách tất cả các phiếu đánh giá theo từng vòng, bao gồm: tên người đánh giá, thời gian, điểm từng tiêu chí, nhận xét và kết quả PASS/FAIL.

- **Scenario 4: Ứng viên bị đánh giá trùng (guard check)**
  - **GIVEN** vòng phỏng vấn đã có đánh giá từ trước (status != null).
  - **WHEN** HR cố gắng tạo đánh giá mới cho cùng vòng đó.
  - **THEN** hệ thống hiển thị cảnh báo: _"Vòng này đã có kết quả đánh giá. Bạn có muốn ghi đè không?"_ và yêu cầu xác nhận trước khi cho phép chỉnh sửa.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ nhiều người đánh giá cùng lúc (collaborative scoring) trong phiên bản này.
- **KHÔNG** tự động tính điểm tổng hợp hoặc xếp hạng ứng viên dựa trên điểm đánh giá.
- **KHÔNG** cho phép ứng viên xem nội dung phiếu đánh giá của mình.
