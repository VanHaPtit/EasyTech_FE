# 📋 User Story 08: Tạo Job Với AI Gợi Ý (Tạo Job with AI JD)

## 1. MÔ TẢ USER STORY
- **Là** Nhà tuyển dụng (HR),
- **Tôi muốn** tạo một tin tuyển dụng (Job) mới và sử dụng AI để tự động viết Mô tả công việc (JD - Job Description) dựa trên một vài từ khóa,
- **Để** tôi có thể tiết kiệm thời gian soạn thảo JD mà vẫn có một tin tuyển dụng chuyên nghiệp, đầy đủ ý.
- **Story Points:** 5

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: HR điền thông tin cơ bản để tạo Job**
  - **VỚI ĐIỀU KIỆN** HR đang ở `/dashboard/jobs` và nhấn "Tạo mới".
  - **KHI** HR điền các trường bắt buộc: Tiêu đề công việc, Vị trí (Location), Mức lương (Min - Max), Loại hình (Full-time/Part-time), Danh mục (Category).
  - **THÌ** các trường này được lưu lại và HR có thể di chuyển xuống phần Mô tả công việc (JD).

- **Kịch bản 2: HR sử dụng AI để tạo JD**
  - **VỚI ĐIỀU KIỆN** HR đang ở màn hình tạo Job, phần Mô tả công việc (Rich Text Editor).
  - **KHI** HR nhập vài từ khóa vào ô "Gợi ý AI" (ví dụ: "ReactJS, 2 năm kinh nghiệm, tiếng Anh cơ bản") và nhấn "Tạo bằng AI".
  - **THÌ** hệ thống gọi API LLM (OpenAI/Gemini). Hiển thị loading spinner. Sau đó trả về một đoạn JD hoàn chỉnh (có cấu trúc: Trách nhiệm, Yêu cầu, Quyền lợi) và tự động điền vào Rich Text Editor.

- **Kịch bản 3: HR chỉnh sửa nội dung AI tạo ra**
  - **VỚI ĐIỀU KIỆN** AI đã tạo xong nội dung JD trong editor.
  - **KHI** HR chỉnh sửa thủ công (thêm, bớt chữ, đổi format).
  - **THÌ** trình soạn thảo hoạt động bình thường, ghi nhận các thay đổi của HR.

- **Kịch bản 4: HR lưu nháp (Save Draft)**
  - **VỚI ĐIỀU KIỆN** HR đã điền một phần thông tin nhưng chưa muốn Publish.
  - **KHI** HR nhấn "Lưu nháp".
  - **THÌ** hệ thống lưu dữ liệu vào bảng `jobs` với `status = DRAFT`. HR được đưa về danh sách Job.

- **Kịch bản 5: Lỗi kết nối AI**
  - **VỚI ĐIỀU KIỆN** AI generation service hiện không khả dụng.
  - **KHI** HR nhấn "Tạo bằng AI".
  - **THÌ** hệ thống hiển thị thông báo thân thiện: _"Dịch vụ AI hiện không khả dụng. Vui lòng thử lại hoặc tiếp tục nhập JD thủ công."_ Trình soạn thảo vẫn khả dụng để gõ thủ công và giữ nguyên dữ liệu HR đã nhập.

## 3. NGOÀI PHẠM VI
- **KHÔNG** hỗ trợ AI tự động dịch JD sang nhiều ngôn ngữ cùng lúc.
- **KHÔNG** có tính năng "Chat" liên tục với AI để chỉnh sửa từng đoạn nhỏ (chỉ tạo một lần dựa trên prompt).
