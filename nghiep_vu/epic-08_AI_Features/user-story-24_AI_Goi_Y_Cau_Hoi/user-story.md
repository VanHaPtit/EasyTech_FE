# 📋 User Story 24: Gợi Ý Câu Hỏi Phỏng Vấn (AI Interview Questions Suggestion)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng / Người phỏng vấn,
- **I want** AI dựa vào những điểm mạnh, điểm yếu từ CV của ứng viên để tự động gợi ý danh sách câu hỏi phỏng vấn,
- **So that** tôi có thể chuẩn bị tốt hơn cho buổi phỏng vấn, xoáy sâu vào các kỹ năng hoặc kinh nghiệm chưa rõ ràng của ứng viên.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR xem gợi ý câu hỏi trong Candidate Drawer**
  - **GIVEN** AI đã phân tích CV thành công (User Story 23 hoàn tất).
  - **WHEN** HR mở tab "Đánh giá / Phỏng vấn" trong Candidate Drawer.
  - **THEN** hệ thống hiển thị một section "Gợi ý câu hỏi phỏng vấn từ AI".
  - Danh sách bao gồm 3-5 câu hỏi được generate từ LLM. Các câu hỏi phải liên kết trực tiếp với dữ liệu CV (Ví dụ: "Bạn ghi có 2 năm kinh nghiệm React nhưng JD yêu cầu quản lý state bằng Redux, bạn có thể nói rõ hơn về kinh nghiệm này không?").

- **Scenario 2: HR lưu câu hỏi AI vào phiếu đánh giá**
  - **GIVEN** HR đang đọc các câu hỏi gợi ý.
  - **WHEN** HR nhấn nút "+" cạnh mỗi câu hỏi.
  - **THEN** câu hỏi đó được add (copy) trực tiếp vào "Ghi chú phỏng vấn cá nhân" hoặc "Phiếu đánh giá" để HR tiện sử dụng trong buổi phỏng vấn thật.

- **Scenario 3: Tạo câu hỏi mới (Regenerate)**
  - **GIVEN** HR không hài lòng với bộ câu hỏi mặc định.
  - **WHEN** HR nhấn nút "Tạo lại câu hỏi" (Regenerate).
  - **THEN** hệ thống gọi lại LLM API, yêu cầu sinh ra các câu hỏi khác (cao cấp hơn hoặc tập trung vào soft-skills), và cập nhật lại giao diện.

- **Scenario 4: Fallback khi AI lỗi**
  - **GIVEN** không kết nối được LLM API hoặc hết quota.
  - **WHEN** HR mở phần gợi ý câu hỏi.
  - **THEN** hệ thống hiển thị thông báo "Tính năng gợi ý câu hỏi hiện không khả dụng" (ẩn phần nội dung lỗi để không làm rối giao diện).

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** gợi ý câu trả lời chuẩn (Answer Key) cho các câu hỏi kỹ thuật hóc búa (chỉ sinh câu hỏi).
- **KHÔNG** tự động chèn các câu hỏi AI này vào bộ "Cấu hình Form Đánh giá vòng mặc định" – nó chỉ mang tính gợi ý cá nhân hóa cho từng ứng viên.
