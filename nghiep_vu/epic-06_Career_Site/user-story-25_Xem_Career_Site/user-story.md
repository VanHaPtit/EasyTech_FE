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
    - Danh sách các Job đang ở trạng thái `ACTIVE`. (Job `CLOSED` hoặc `DRAFT` không hiển thị).

- **Kịch bản 2: Lọc và tìm kiếm Job trên Career Site**
  - **VỚI ĐIỀU KIỆN** ứng viên đang xem trang Career Site của công ty.
  - **KHI** ứng viên nhập từ khóa vào ô tìm kiếm hoặc lọc theo Danh mục (Categories).
  - **THÌ** danh sách Job bên dưới hiển thị ngay kết quả khớp (Client-side hoặc Server-side filtering), giúp ứng viên tìm nhanh vị trí phù hợp.

- **Kịch bản 3: Ứng viên xem chi tiết một tin tuyển dụng (JD)**
  - **VỚI ĐIỀU KIỆN** ứng viên thấy một Job quan tâm trên Career Site.
  - **KHI** ứng viên click vào tên Job đó.
  - **THÌ** hệ thống chuyển đến URL `/careers/{company_slug}/jobs/{job_id}`.
  - Trang chi tiết hiển thị: Tiêu đề công việc, Mức lương, Địa điểm, Loại hình và toàn bộ nội dung Mô tả công việc (Rich text).
  - Luôn có nút "Ứng tuyển ngay" (Apply Now) ghim ở vị trí dễ thấy (sticky header/bottom).

- **Kịch bản 4: Career Site bị vô hiệu hóa**
  - **VỚI ĐIỀU KIỆN** HR của công ty đã tắt cờ `is_published` của Career Site.
  - **KHI** ứng viên truy cập vào `/careers/{company_slug}`.
  - **THÌ** hệ thống hiển thị trang lỗi "Công ty hiện không tuyển dụng hoặc trang không khả dụng." và không hiển thị thông tin gì thêm.

## 3. NGOÀI PHẠM VI
- **KHÔNG** hỗ trợ tạo tài khoản Ứng viên (Candidate Portal profile lưu sẵn CV) trong hệ thống này – ứng viên khách vãng lai hoàn toàn (Guest).
- **KHÔNG** có chức năng "Lưu việc làm" (Save Job).
