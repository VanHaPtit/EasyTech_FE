# 📋 User Story 23: CV Scoring & Insights (AI Chấm Điểm CV Tự Động)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want** hệ thống tự động phân tích CV của ứng viên ngay khi nộp đơn và đánh giá độ phù hợp so với Job Description (JD),
- **So that** tôi có thể nhanh chóng lọc ra những ứng viên tiềm năng nhất mà không cần phải đọc thủ công từng CV một, tiết kiệm thời gian sàng lọc ban đầu.
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Hệ thống tự động chấm điểm CV mới**
  - **GIVEN** ứng viên vừa nộp đơn thành công, CV dạng PDF được lưu lên Storage.
  - **WHEN** ứng dụng (Application) được tạo.
  - **THEN** Backend kích hoạt Background Worker:
    - Đọc text từ CV PDF (OCR / Parsing).
    - Lấy thông tin JD hiện tại.
    - Gọi LLM API (OpenAI/Gemini) hoặc Python Engine để phân tích độ tương đồng.
    - Trả về kết quả JSON (Matching Score, Điểm mạnh, Điểm yếu) và lưu vào bảng `cv_insights`.
    - UI trên Kanban/List View tự động hiển thị số điểm (VD: 85%) cạnh tên ứng viên.

- **Scenario 2: HR xem chi tiết CV Insights**
  - **GIVEN** AI đã phân tích CV thành công.
  - **WHEN** HR mở Candidate Drawer của ứng viên đó.
  - **THEN** phần "AI Insights" hiển thị đồ thị / thanh đo điểm số (Matching Score).
  - Phía dưới hiển thị bullet points rõ ràng: "Điểm mạnh (Khớp JD)", "Điểm yếu (Thiếu sót so với JD)" và "Nhận xét tổng quan của AI".

- **Scenario 3: Xử lý file CV không thể đọc (Non-parsable)**
  - **GIVEN** ứng viên nộp một file hình ảnh (scanned PDF) không chứa text hoặc bị hỏng định dạng.
  - **WHEN** Background Worker chạy.
  - **THEN** công đoạn trích xuất text thất bại hoặc ra chuỗi rỗng.
  - Lưu trạng thái lỗi vào `cv_insights`. UI hiển thị: "AI không thể đọc được nội dung CV này. Vui lòng chấm thủ công."

- **Scenario 4: HR yêu cầu chấm điểm lại (Re-score)**
  - **GIVEN** HR đã cập nhật lại JD của Job, khiến các điểm số cũ không còn chính xác.
  - **WHEN** HR nhấn nút "Chạy lại AI Scoring" trên Drawer hoặc chọn hàng loạt ứng viên và chạy lại.
  - **THEN** Backend đẩy lại job vào queue và phân tích lại với JD mới. Khi hoàn thành, cập nhật lại điểm mới.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** tự động loại bỏ (Auto-reject) ứng viên nếu điểm thấp – AI chỉ mang tính chất gợi ý, quyết định cuối cùng vẫn thuộc về HR.
- **KHÔNG** phân tích ngôn ngữ cảm xúc hay bias giới tính/độ tuổi (chỉ match hard skills/experience giữa CV và JD).
