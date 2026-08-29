# 📋 User Story 08: Tạo Job Với AI Gợi Ý (Create Job with AI JD)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR),
- **I want to** tạo một tin tuyển dụng (Job) mới và sử dụng AI để tự động viết Mô tả công việc (JD - Job Description) dựa trên một vài từ khóa,
- **So that** tôi có thể tiết kiệm thời gian soạn thảo JD mà vẫn có một tin tuyển dụng chuyên nghiệp, đầy đủ ý.
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR điền thông tin cơ bản để tạo Job**
  - **GIVEN** HR đang ở `/dashboard/jobs` và nhấn "Tạo mới".
  - **WHEN** HR điền các trường bắt buộc: Tiêu đề công việc, Vị trí (Location), Mức lương (Min - Max), Loại hình (Full-time/Part-time), Danh mục (Category).
  - **THEN** các trường này được lưu lại và HR có thể di chuyển xuống phần Mô tả công việc (JD).

- **Scenario 2: HR sử dụng AI để tạo JD**
  - **GIVEN** HR đang ở màn hình tạo Job, phần Mô tả công việc (Rich Text Editor).
  - **WHEN** HR nhập vài từ khóa vào ô "Gợi ý AI" (ví dụ: "ReactJS, 2 năm kinh nghiệm, tiếng Anh cơ bản") và nhấn "Tạo bằng AI".
  - **THEN** hệ thống gọi API LLM (OpenAI/Gemini). Hiển thị loading spinner. Sau đó trả về một đoạn JD hoàn chỉnh (có cấu trúc: Trách nhiệm, Yêu cầu, Quyền lợi) và tự động điền vào Rich Text Editor.

- **Scenario 3: HR chỉnh sửa nội dung AI tạo ra**
  - **GIVEN** AI đã tạo xong nội dung JD trong editor.
  - **WHEN** HR chỉnh sửa thủ công (thêm, bớt chữ, đổi format).
  - **THEN** trình soạn thảo hoạt động bình thường, ghi nhận các thay đổi của HR.

- **Scenario 4: HR lưu nháp (Save Draft)**
  - **GIVEN** HR đã điền một phần thông tin nhưng chưa muốn Publish.
  - **WHEN** HR nhấn "Lưu nháp".
  - **THEN** hệ thống lưu dữ liệu vào bảng `jobs` với `status = DRAFT`. HR được đưa về danh sách Job.

- **Scenario 5: Lỗi kết nối AI**
  - **GIVEN** API AI provider bị lỗi hoặc HR chưa cấu hình API key.
  - **WHEN** HR nhấn "Tạo bằng AI".
  - **THEN** hệ thống hiển thị thông báo: _"Không thể kết nối đến dịch vụ AI lúc này. Vui lòng thử lại hoặc tự soạn nội dung."_ Trình soạn thảo vẫn khả dụng để gõ thủ công.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** hỗ trợ AI tự động dịch JD sang nhiều ngôn ngữ cùng lúc.
- **KHÔNG** có tính năng "Chat" liên tục với AI để chỉnh sửa từng đoạn nhỏ (chỉ tạo một lần dựa trên prompt).
