# 📋 User Story 24: Gợi Ý Câu Hỏi Phỏng Vấn (AI Interview Questions Suggestion)

## 1. MÔ TẢ USER STORY
- **Là** Nhà tuyển dụng / Người phỏng vấn,
- **Tôi muốn** AI dựa vào những điểm mạnh, điểm yếu từ CV của ứng viên để tự động gợi ý danh sách câu hỏi phỏng vấn,
- **Để** tôi có thể chuẩn bị tốt hơn cho buổi phỏng vấn, xoáy sâu vào các kỹ năng hoặc kinh nghiệm chưa rõ ràng của ứng viên.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: HR xem gợi ý câu hỏi trong Candidate Drawer**
  - **VỚI ĐIỀU KIỆN** AI đã phân tích CV thành công (User Story 23 hoàn tất).
  - **KHI** HR mở tab "Đánh giá / Phỏng vấn" trong Candidate Drawer.
  - **THÌ** hệ thống hiển thị một section "Gợi ý câu hỏi phỏng vấn từ AI".
  - Danh sách bao gồm 3-5 câu hỏi được generate từ LLM. Các câu hỏi phải liên kết trực tiếp với dữ liệu CV (Ví dụ: "Bạn ghi có 2 năm kinh nghiệm React nhưng JD yêu cầu quản lý state bằng Redux, bạn có thể nói rõ hơn về kinh nghiệm này không?").

- **Kịch bản 2: HR lưu câu hỏi AI vào phiếu đánh giá**
  - **VỚI ĐIỀU KIỆN** HR đang đọc các câu hỏi gợi ý.
  - **KHI** HR nhấn nút "+" cạnh mỗi câu hỏi.
  - **THÌ** câu hỏi đó được add (copy) trực tiếp vào "Ghi chú phỏng vấn cá nhân" hoặc "Phiếu đánh giá" để HR tiện sử dụng trong buổi phỏng vấn thật.

- **Kịch bản 3: Tạo câu hỏi mới (Regenerate)**
  - **VỚI ĐIỀU KIỆN** HR không hài lòng với bộ câu hỏi mặc định.
  - **KHI** HR nhấn nút "Tạo lại câu hỏi" (Regenerate).
  - **THÌ** hệ thống gọi lại LLM API, yêu cầu sinh ra các câu hỏi khác (cao cấp hơn hoặc tập trung vào soft-skills), và cập nhật lại giao diện.

- **Kịch bản 4: Fallback khi AI lỗi**
  - **VỚI ĐIỀU KIỆN** không kết nối được LLM API hoặc hết quota.
  - **KHI** HR mở phần gợi ý câu hỏi.
  - **THÌ** hệ thống hiển thị thông báo "Tính năng gợi ý câu hỏi hiện không khả dụng" (ẩn phần nội dung lỗi để không làm rối giao diện).

## 3. NGOÀI PHẠM VI
- **KHÔNG** gợi ý câu trả lời chuẩn (Answer Key) cho các câu hỏi kỹ thuật hóc búa (chỉ sinh câu hỏi).
- **KHÔNG** tự động chèn các câu hỏi AI này vào bộ "Cấu hình Form Đánh giá vòng mặc định" – nó chỉ mang tính gợi ý cá nhân hóa cho từng ứng viên.
