# 📋 User Story 34: AI Shadow Matching & Suggestions (Gợi Ý Ứng Viên Từ Kho Dữ Liệu Cũ)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want** hệ thống AI tự động quét và gợi ý các ứng viên tiềm năng từ kho dữ liệu cũ (Candidate Pool) của công ty phù hợp với Tin tuyển dụng mới,
- **So that** tôi có thể tái sử dụng nguồn lực ứng viên cũ, tối ưu chi phí và thời gian tuyển dụng thay vì luôn phải chờ ứng viên mới nộp đơn.
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: AI đề xuất ứng viên khi Job được Publish**
  - **GIVEN** hệ thống có kho lưu trữ hồ sơ ứng viên cũ trong bảng `candidates` và `applications`, và mỗi hồ sơ đã có `cv_insights` từ AI (matching_score, strengths, skills).
  - **WHEN** HR publish một tin tuyển dụng mới (Jobs có trạng thái chuyển từ `DRAFT` → `ACTIVE`).
  - **THEN** hệ thống kích hoạt Background Worker chạy ngầm (không block UI):
    - Worker gọi Python AI Service để thực hiện Vector Similarity Search giữa JD mới và các CV trong kho.
    - Lưu tối đa 10 ứng viên phù hợp nhất (score ≥ 70%) vào bảng `ai_suggestions` với `job_id` và `candidate_id` tương ứng.
    - Hiển thị danh sách gợi ý tại tab **"AI Match"** trên giao diện quản trị của Job đó sau khi Worker hoàn thành.

- **Scenario 2: HR xem danh sách ứng viên được AI gợi ý**
  - **GIVEN** Job đã được publish và Worker đã hoàn thành xử lý.
  - **WHEN** HR vào trang quản lý Job và chọn tab "AI Match".
  - **THEN** hệ thống hiển thị danh sách tối đa 10 ứng viên, mỗi ứng viên gồm: Tên, Email, Điểm phù hợp (%), Điểm nổi bật (strengths), Thời gian nộp đơn gần nhất, Nút "Liên hệ".

- **Scenario 3: HR liên hệ với ứng viên được gợi ý**
  - **GIVEN** HR đang xem danh sách AI Match và muốn tiếp cận một ứng viên.
  - **WHEN** HR nhấn nút "Liên hệ" đối với một ứng viên trong danh sách.
  - **THEN** hệ thống mở popup gửi email với template mặc định "Mời ứng tuyển" (có thể chỉnh sửa nội dung trước khi gửi).
  - Sau khi gửi: cập nhật `ai_suggestions.contact_status = CONTACTED` và ghi nhận thời gian liên hệ.
  - Danh sách AI Match cập nhật badge "Đã liên hệ" bên cạnh tên ứng viên đó.

- **Scenario 4: Chưa có dữ liệu ứng viên cũ phù hợp**
  - **GIVEN** kho ứng viên cũ trống hoặc không có ứng viên nào đạt score ≥ 70%.
  - **WHEN** Worker hoàn thành xử lý mà không tìm được kết quả phù hợp.
  - **THEN** tab "AI Match" hiển thị thông báo: _"Chưa tìm thấy ứng viên phù hợp từ kho dữ liệu. Hệ thống sẽ cập nhật khi có thêm hồ sơ mới."_

- **Scenario 5: HR kích hoạt lại AI Matching thủ công**
  - **GIVEN** Job đã publish và kho ứng viên đã được bổ sung thêm hồ sơ mới.
  - **WHEN** HR nhấn nút "Chạy lại AI Match" trong tab "AI Match".
  - **THEN** hệ thống xóa kết quả cũ trong `ai_suggestions` của Job đó và chạy lại Background Worker với toàn bộ kho ứng viên hiện tại.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** gợi ý ứng viên từ kho dữ liệu của công ty khác (multi-tenant isolation).
- **KHÔNG** tự động tạo đơn ứng tuyển cho ứng viên được gợi ý – HR phải liên hệ và ứng viên tự nộp.
- **KHÔNG** hiển thị danh sách AI Suggestions cho ứng viên công khai (tính năng nội bộ HR Dashboard).
