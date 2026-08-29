# 📋 User Story 14: Kanban Board Ứng Viên (Bảng Quản Lý Tuyển Dụng Động)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** xem danh sách ứng viên của một tin tuyển dụng dưới dạng Kanban Board với các cột được tạo **tự động theo cấu hình vòng tuyển dụng (hiring_rounds)** của Job đó,
- **So that** tôi có thể quản lý và theo dõi tiến trình từng ứng viên qua từng vòng phỏng vấn một cách trực quan.
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Hiển thị Kanban Board động theo cấu hình vòng của Job**
  - **GIVEN** HR đã chọn một Tin tuyển dụng cụ thể để quản lý.
  - **WHEN** HR truy cập màn hình Kanban tại `/dashboard/applications/kanban?job_id={job_id}`.
  - **THEN** hệ thống gọi API `GET /api/v1/jobs/{job_id}/rounds` để lấy danh sách `hiring_rounds` đã cấu hình.
  - **Kanban Board tự động render các cột như sau:**
    - **Cột 1 – "Mới"** (cố định): Hiển thị tất cả ứng viên vừa nộp đơn, chưa được phân vào vòng nào.
    - **Cột trung gian – Động**: Render lần lượt từng vòng trong `hiring_rounds` theo `order_index` tăng dần (ví dụ: *CV Screening → Online Test → Phỏng vấn kỹ thuật → Phỏng vấn cuối*).
    - **Cột kế cuối – "Đạt"** (cố định): Ứng viên có trạng thái `PASSED` sau vòng cuối cùng.
    - **Cột cuối – "Không đạt"** (cố định): Ứng viên có trạng thái `REJECTED` ở bất kỳ vòng nào.

- **Scenario 2: HR kéo-thả (Drag & Drop) ứng viên sang vòng tiếp theo**
  - **GIVEN** HR thấy card ứng viên ở cột "Mới" hoặc một vòng trung gian.
  - **WHEN** HR kéo card ứng viên đó và thả vào cột kế tiếp (vòng tiếp theo).
  - **THEN** hệ thống gọi API `PUT /api/v1/applications/{app_id}/stage` với payload `{ "round_id": "uuid", "status": "IN_PROGRESS" }`.
  - Giao diện cập nhật ngay lập tức (optimistic update) không cần reload trang.
  - Nếu API trả về lỗi, card tự động trở về vị trí ban đầu và hiển thị thông báo lỗi.

- **Scenario 3: HR đánh dấu ứng viên Đạt hoặc Không đạt từ Kanban**
  - **GIVEN** ứng viên đang ở một vòng trung gian trên Kanban.
  - **WHEN** HR nhấn nút "..." trên card và chọn "Đánh dấu Đạt" hoặc "Đánh dấu Không đạt".
  - **THEN** hệ thống cập nhật trạng thái `round_statuses` tương ứng:
    - "Đánh dấu Đạt": Di chuyển card sang cột **"Đạt"** (nếu là vòng cuối) hoặc vòng tiếp theo.
    - "Đánh dấu Không đạt": Di chuyển card sang cột **"Không đạt"** ở bất kỳ vòng nào.
  - Hệ thống tự động kích hoạt Email Automation gửi email thông báo kết quả đến ứng viên.

- **Scenario 4: Job không có hiring_rounds (dùng cấu hình tối giản)**
  - **GIVEN** HR tạo Job nhưng chưa cấu hình bất kỳ vòng tuyển dụng nào.
  - **WHEN** HR truy cập Kanban của Job đó.
  - **THEN** hệ thống hiển thị Kanban với 3 cột tối thiểu: **Mới → Đang xử lý → Kết thúc (Đạt/Không đạt)** và hiển thị banner nhắc nhở HR cấu hình vòng tuyển dụng.

- **Scenario 5: Lọc và tìm kiếm ứng viên trên Kanban**
  - **GIVEN** HR đang xem Kanban của một Job có nhiều ứng viên.
  - **WHEN** HR nhập từ khóa vào ô tìm kiếm hoặc chọn bộ lọc (theo nguồn nộp, theo điểm AI Score, theo ngày nộp).
  - **THEN** các card trên Kanban lọc lại theo điều kiện, các card không phù hợp ẩn đi mà không thay đổi cấu trúc cột.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** cho phép HR kéo ứng viên ngược lại vòng trước (chỉ tiến về phía trước hoặc sang "Không đạt").
- **KHÔNG** hỗ trợ xem đồng thời Kanban của nhiều Job cùng lúc.
- **KHÔNG** tích hợp tính năng comment hoặc ghi chú trực tiếp trên card Kanban (tính năng này thuộc Candidate Drawer – User Story 16).
