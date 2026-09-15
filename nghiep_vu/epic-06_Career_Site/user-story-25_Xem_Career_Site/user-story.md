# 📋 User Story 25: Xem Career Site & Job Công Khai

## 1. MÔ TẢ USER STORY
- **Là** Ứng viên (Candidate) / Khách truy cập ẩn danh (Guest),
- **Tôi muốn** truy cập vào trang Career Site của một công ty và xem danh sách các tin tuyển dụng đang mở,
- **Để** tôi có thể tìm hiểu về công ty, văn hóa và tìm kiếm vị trí công việc phù hợp để nộp đơn.
- **Story Points:** 3

## SƠ ĐỒ LUỒNG NGHIỆP VỤ (Business Flow)

```mermaid
graph TD
    A[Ứng viên truy cập link Career Site] --> B[BE Query Public Company Data]
    B --> C[Render Branding (Logo, Colors)]
    C --> D[Render Danh sách Job (PUBLISHED)]
    D --> E[Ứng viên xem chi tiết Job]
```

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: Ứng viên truy cập Career Site của công ty**
  - **VỚI ĐIỀU KIỆN** một công ty đã thiết lập Career Site (đã publish).
  - **KHI** ứng viên truy cập URL `/careers/{company_slug}`.
  - **THÌ** hệ thống tải trang Career Site với:
    - Giao diện (Logo, Banner, Primary Color) đã được HR cấu hình.
    - Tên công ty, Slogan và Mô tả.
    - Danh sách các Job đang ở trạng thái `ACTIVE` và chưa bị soft delete. (Job `CLOSED` hoặc `INACTIVE` không hiển thị).

- **Kịch bản 2: Lọc và tìm kiếm Job trên Career Site**
  - **VỚI ĐIỀU KIỆN** ứng viên đang xem trang Career Site của công ty.
  - **KHI** ứng viên nhập từ khóa vào ô tìm kiếm hoặc lọc theo Danh mục (Categories).
  - **THÌ** danh sách Job bên dưới hiển thị ngay kết quả khớp bằng server-side filtering theo `keyword`, `location` và category slug; category chỉ gồm bản ghi `ACTIVE` và chưa bị soft delete.
  - Category `INACTIVE` vẫn có thể còn được gắn với Job cũ nhưng không xuất hiện trong bộ lọc. Job cũ có trạng thái `ACTIVE` vẫn xuất hiện trong danh sách không lọc category.

- **Kịch bản 3: Ứng viên xem chi tiết một tin tuyển dụng (JD)**
  - **VỚI ĐIỀU KIỆN** ứng viên thấy một Job quan tâm trên Career Site.
  - **KHI** ứng viên click vào tên Job đó.
  - **THÌ** hệ thống chuyển đến URL `/careers/{company_slug}/jobs/{job_slug}`. `job_slug` chỉ unique trong phạm vi company nên URL luôn giữ cả `company_slug`.
  - Trang chi tiết hiển thị: Tiêu đề công việc, Mức lương, Địa điểm, Loại hình và toàn bộ nội dung Mô tả công việc (Rich text).
  - Luôn có nút "Ứng tuyển ngay" (Apply Now) ghim ở vị trí dễ thấy (sticky header/bottom).

- **Kịch bản 4: Career Site bị vô hiệu hóa**
  - **VỚI ĐIỀU KIỆN** HR của công ty đã tắt cờ `is_published` của Career Site.
  - **KHI** ứng viên truy cập vào `/careers/{company_slug}`.
  - **THÌ** hệ thống hiển thị trang lỗi "Công ty hiện không tuyển dụng hoặc trang không khả dụng." và không hiển thị thông tin gì thêm.

## 3. NGOÀI PHẠM VI
- **KHÔNG** hỗ trợ tạo tài khoản Ứng viên (Candidate Portal profile lưu sẵn CV) trong hệ thống này – ứng viên khách vãng lai hoàn toàn (Guest).
- **KHÔNG** có chức năng "Lưu việc làm" (Save Job).

## 4. Contract đã triển khai trong US-25

- Route public chuẩn: `/careers/{companySlug}` và `/careers/{companySlug}/jobs/{jobSlug}`.
- `/company/{companySlug}` chỉ là alias tương thích và redirect về route chuẩn.
- API public:
  - `GET /api/v1/public/companies/{companySlug}` lấy branding, thông tin public và danh mục `ACTIVE` chưa soft delete.
  - `GET /api/v1/public/companies/{companySlug}/jobs` nhận `keyword`, `location`, `category`, `page`, `limit`.
  - `GET /api/v1/public/companies/{companySlug}/jobs/{jobSlug}` lấy chi tiết Job public.
- Backend chỉ trả dữ liệu khi company `ACTIVE`, Career Site tồn tại và `is_published = true`.
- Job public phải có `status = ACTIVE` và `is_deleted = false`.
- `category` là slug; category `INACTIVE`, đã soft delete hoặc không tồn tại không được trả về trong filter và khi lọc theo slug đó sẽ cho trang rỗng.
- API dùng ID `BIGINT`/Java `Long`; pagination dùng duy nhất `page` bắt đầu từ `1` và `limit` theo `PaginationRequest`.
- Chi tiết Job trong US-25 trả các trường Job public và thông tin công ty tối thiểu. US-15 mở rộng cùng endpoint bằng `applicationForm.fields` để Career Site và flow apply dùng cấu hình field tùy chỉnh; các field đã soft delete không được trả về.
- Nút `Ứng tuyển ngay` chỉ điều hướng sang flow US-26; US-25 không tự xử lý application hoặc dynamic form.
