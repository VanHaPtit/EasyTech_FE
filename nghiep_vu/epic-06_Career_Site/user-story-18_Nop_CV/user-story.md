# 📋 User Story 18: Nộp Đơn Ứng Tuyển (Apply for Job)

## 1. MÔ TẢ USER STORY
- **As a** Ứng viên (Candidate),
- **I want to** điền form và nộp CV trực tiếp trên Career Site của công ty mà không cần đăng ký tài khoản,
- **So that** tôi có một trải nghiệm ứng tuyển nhanh chóng, mượt mà và nhận được xác nhận ngay lập tức.
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: Ứng viên điền form ứng tuyển hợp lệ**
  - **GIVEN** ứng viên đang xem trang chi tiết một Job.
  - **WHEN** ứng viên nhấn "Ứng tuyển ngay", điền Họ tên, Email, Số điện thoại hợp lệ và tải lên CV (PDF, <5MB) cùng các câu hỏi phụ (nếu có).
  - **THEN** khi nhấn "Nộp Đơn":
    - Hệ thống upload CV lên Cloud Storage (S3) và nhận URL.
    - Lưu thông tin vào bảng `candidates` (nếu email chưa tồn tại trong company này) và `applications`.
    - Ứng viên được chuyển sang trang "Nộp đơn thành công!" với hiệu ứng cảm ơn.
    - Email xác nhận (chứa Magic Link) tự động được gửi đến ứng viên.

- **Scenario 2: Validate định dạng và dung lượng CV**
  - **GIVEN** ứng viên đang điền form ứng tuyển.
  - **WHEN** ứng viên chọn file CV không phải định dạng PDF hoặc file lớn hơn 5MB.
  - **THEN** hệ thống không upload file và hiển thị lỗi inline ngay lập tức: _"Chỉ chấp nhận file định dạng PDF."_ hoặc _"Dung lượng file không được vượt quá 5MB."_ Form không thể Submit.

- **Scenario 3: Ứng tuyển nhiều lần cùng một Job (Spam Protection)**
  - **GIVEN** ứng viên đã nộp đơn thành công cho Job A với email `test@email.com`.
  - **WHEN** ứng viên cố gắng nộp lại Job A với cùng email đó trong vòng 30 ngày.
  - **THEN** hệ thống chặn Submit và báo lỗi: _"Bạn đã ứng tuyển vị trí này rồi. Vui lòng kiểm tra email để theo dõi tiến độ."_

- **Scenario 4: Form động có câu hỏi bắt buộc**
  - **GIVEN** HR đã thiết lập các trường bắt buộc (ví dụ: Link Portfolio) cho Job.
  - **WHEN** ứng viên bỏ trống các trường này và nhấn Nộp đơn.
  - **THEN** form highlight đỏ các trường thiếu và hiển thị thông báo "Vui lòng nhập thông tin bắt buộc." Không xử lý Submit.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ Login bằng LinkedIn / Google để tự điền (Auto-fill) form trong phiên bản này.
- **KHÔNG** hỗ trợ nộp đơn bằng cách tải CV lên Dropbox/Google Drive (phải upload local file).
