# 📋 User Story 33: Cấu Hình Career Site (Career Site Branding & Settings)

## 1. MÔ TẢ USER STORY
- **Là** Nhà tuyển dụng (HR),
- **Tôi muốn** tùy chỉnh giao diện trang Career Site công khai của công ty mình (logo, banner, màu chủ đạo, mô tả công ty),
- **Để** trang tuyển dụng của công ty phản ánh đúng nhận diện thương hiệu (Brand Identity) và tạo ấn tượng tốt với ứng viên tiềm năng.
- **Story Points:** 5

## SƠ ĐỒ LUỒNG NGHIỆP VỤ (Business Flow)

```mermaid
graph TD
    A[Mở giao diện 33 Career Site Settings] --> B[Thực hiện thao tác]
    B --> C{Hệ thống xử lý}
    C -- Lỗi --> D[Báo lỗi]
    C -- Thành công --> E[Cập nhật CSDL]
    E --> F[Phản hồi giao diện thành công]
```

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

### Phân định dữ liệu với US-30
- `company_profiles.industry`, `business_type`, `company_size`, `slogan`, `description`, `logo_url` và `banner_urls` là dữ liệu hồ sơ doanh nghiệp dùng chung; General Settings (US-30) cho phép HR Admin chỉnh sửa các field này sau onboarding.
- Chốt 21/10/2026: Career Site giữ cấu hình riêng; US-30 chỉ sửa profile, không sao chép logo/hero vào site. Dữ liệu site legacy giữ nguyên như override hiện hữu; không tự suy đoán và xóa bản sao cũ.
- `company_profiles.slogan` và `career_sites.tagline` là hai field riêng trong schema hiện tại. US-30 chỉ sửa slogan doanh nghiệp; tagline là nội dung riêng của Career Site.
- Logo public: site.logo_url → profile.logo_url. Hero site đứng đầu bannerUrls, sau đó gallery profile không trùng; thiếu hero dùng gallery profile. Tagline: site.tagline → profile.slogan. Tiêu đề: site.site_title → companies.name. Primary lấy profile.primary_color; accent: site.accent_color → profile.primary_color → mặc định #2563eb. Cấu hình rỗng/trắng được coi là thiếu; GET chỉ resolve fallback, không ghi DB.

- **Kịch bản 1: HR cấu hình thông tin cơ bản Career Site**
  - **VỚI ĐIỀU KIỆN** HR đang đăng nhập và truy cập `/dashboard/career-site`.
  - **KHI** HR điền/cập nhật các thông tin: Tên công ty hiển thị, Slogan/Tagline, Mô tả công ty (rich text), Địa chỉ, Website, Quy mô nhân sự.
  - **THÌ** hệ thống lưu dữ liệu vào bảng `career_sites` và các trường nội dung tương ứng trong `company_profiles` với `company_id` tương ứng thông qua API cấu hình Career Site.
  - Có nút "Xem trước" để HR preview Career Site trước khi lưu chính thức.

- **Kịch bản 2: HR upload Logo công ty**
  - **VỚI ĐIỀU KIỆN** HR đang ở trang cấu hình Career Site, section "Hình ảnh thương hiệu".
  - **KHI** HR nhấn "Tải lên Logo", chọn file ảnh (PNG/JPG/SVG, tối đa 2MB, khuyến nghị 200x200px) và nhấn "Lưu".
  - **THÌ** hệ thống upload file lên Cloud Storage (S3/Cloudinary), lưu URL vào `career_sites.logo_url` và hiển thị logo mới ngay lập tức trên preview.
  - Nếu file vượt 2MB: hiển thị lỗi "File logo không được vượt quá 2MB."

- **Kịch bản 3: HR tùy chỉnh Banner ảnh bìa**
  - **VỚI ĐIỀU KIỆN** HR đang ở section "Hình ảnh thương hiệu".
  - **KHI** HR upload ảnh bìa hồ sơ theo image-rules hiện hành (JPG/JPEG/PNG, tối đa 5MB, tỷ lệ16:9, từ1280x720 đến3840x2160; tối đa5 ảnh).
  - **THÌ** hệ thống lưu danh sách có thứ tự vào `company_profiles.banner_urls`; `career_sites.hero_image_url` giữ override hero riêng. Không tạo lại cột singular `banner_url` đã được thay thế bằng gallery.
  - Trang Career Site công khai cập nhật banner mới ngay sau khi HR lưu (không cần deploy lại).

- **Kịch bản 4: HR tùy chỉnh màu chủ đạo thương hiệu**
  - **VỚI ĐIỀU KIỆN** HR đang ở section "Màu sắc thương hiệu".
  - **KHI** HR chọn màu primary (màu nút CTA, thanh navigation) thông qua color picker hoặc nhập mã HEX.
  - **THÌ** hệ thống lưu `company_profiles.primary_color`; `career_sites.accent_color` dùng cho màu nhấn của giao diện.
  - Trang Career Site tự động áp dụng màu mới cho tất cả các element (nút "Ứng tuyển", header, link).
  - Nếu mã màu không hợp lệ: hiển thị lỗi và revert về màu trước.

- **Kịch bản 5: Career Site chưa được cấu hình hiển thị trạng thái mặc định**
  - **VỚI ĐIỀU KIỆN** công ty mới đăng ký, chưa cấu hình bất kỳ thông tin Career Site nào.
  - **KHI** ứng viên truy cập URL Career Site của công ty đó: `/careers/{company_slug}`.
  - **THÌ** trang hiển thị dữ liệu profile/company làm fallback; khi cả hai thiếu dùng màu mặc định hiện hành #2563eb, không có ảnh hoặc nội dung giả. Chỉ public nếu Company ACTIVE và site published.

- **Kịch bản 6: HR bật/tắt Career Site công khai**
  - **VỚI ĐIỀU KIỆN** HR đang ở trang cấu hình Career Site.
  - **KHI** HR toggle switch "Hiển thị Career Site công khai" sang OFF.
  - **THÌ** hệ thống cập nhật `career_sites.is_published = false`. Khi ứng viên truy cập URL Career Site, hệ thống trả về trang "404 – Career Site hiện không khả dụng."

## 3. NGOÀI PHẠM VI
- **KHÔNG** hỗ trợ chỉnh sửa layout/template Career Site (thêm/xóa section, drag-drop blocks) trong phiên bản này.
- **KHÔNG** hỗ trợ custom domain (sử dụng tên miền riêng của công ty) – chỉ subdomain dạng `/{company_slug}`.
- **KHÔNG** hỗ trợ đa ngôn ngữ (i18n) cho Career Site trong phiên bản này.
