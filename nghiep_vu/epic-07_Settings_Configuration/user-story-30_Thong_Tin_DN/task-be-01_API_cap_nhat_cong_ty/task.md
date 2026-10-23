# task-be-01_API_cap_nhat_cong_ty

## Mục đích
Xác định phạm vi backend cho task 'API cap nhat cong ty' trong US-30 Thong Tin DN, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.
- Quản lý Audit Log cho các hành động thay đổi dữ liệu quan trọng.

## Endpoint hiện hành
- `PATCH /api/v1/company-profiles/me`
- Alias đọc thông tin hiện tại: `GET /api/v1/companies/me` hoặc `GET /api/v1/company-profiles/me`.
- Request cập nhật sau onboarding chỉ được thực hiện bởi `HR_ADMIN` trên company của chính user và có CSRF.
- Allowlist sau onboarding: `phone`, `address`, `provinceCode`, `wardCode`, `website`, `industry`, `businessType`, `companySize`, `slogan`, `description`, `logoUrl`, `bannerUrls`. Nếu request chứa field khác, trả `400` và không cập nhật dữ liệu. HR không có quyền Admin nhận `403`.
- Upload ảnh dùng `GET /api/v1/uploads/image-rules`, `POST /api/v1/uploads/company-logo` và `POST /api/v1/uploads/company-covers`; chỉ `HR_ADMIN` hoặc `ADMIN` được upload. Upload trả URL; PATCH mới lưu URL vào profile.
- `industry` lưu lĩnh vực hoạt động; `businessType` lưu ngành nghề chính/loại hình theo field hiện có. Không thêm `primaryIndustry` hoặc bảng mới.
- Logo lưu vào `company_profiles.logo_url`, ảnh bìa lưu `company_profiles.banner_urls`; không ghi/xóa override `career_sites.logo_url`/`hero_image_url`. Public dùng profile làm fallback khi override không có. Quyết định 21/10/2026 thay cơ chế sao chép cũ.
- `slogan` lưu ở `company_profiles.slogan`; không cập nhật `career_sites.tagline`.

## API JSON Contract

### Request Body
```json
{
  "phone": "0987654321",
  "address": "Số 12, ngõ 3 Nguyễn Huệ",
  "provinceCode": "79",
  "wardCode": "26734",
  "website": "https://techa.vn",
  "industry": "Tài chính công nghệ",
  "businessType": "Product",
  "companySize": "51-200",
  "slogan": "Đổi mới mỗi ngày",
  "description": "Giới thiệu về công ty.",
  "logoUrl": "https://res.cloudinary.com/example/company-logo.webp",
  "bannerUrls": [
    "https://res.cloudinary.com/example/cover-1.webp",
    "https://res.cloudinary.com/example/cover-2.webp"
  ]
}
```

Mọi field là tùy chọn; field bỏ qua được giữ nguyên. Gửi `bannerUrls: []` để xóa ảnh bìa. URL ảnh bìa phải là HTTPS và danh sách không vượt giới hạn từ image rules.

Địa chỉ chi tiết chỉ lưu tại `companies.address`; mã tỉnh/xã lưu riêng. Gửi cả hai mã địa giới hoặc để trống cả hai. Chuỗi địa chỉ legacy không được tự phân tích hay ghép thêm tên địa giới khi lưu.

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Cập nhật hồ sơ công ty thành công",
  "data": {
    "id": 5,
    "name": "TechA Solutions",
    "taxCode": "0123456789",
    "phone": "0987654321",
    "address": "Số 12, ngõ 3 Nguyễn Huệ",
    "provinceCode": "79",
    "wardCode": "26734",
    "website": "https://techa.vn",
    "profile": {
      "industry": "Tài chính công nghệ",
      "businessType": "Product",
      "companySize": "51-200",
      "slogan": "Đổi mới mỗi ngày",
      "description": "Giới thiệu về công ty.",
      "logoUrl": "https://res.cloudinary.com/example/company-logo.webp",
      "bannerUrls": [
        "https://res.cloudinary.com/example/cover-1.webp",
        "https://res.cloudinary.com/example/cover-2.webp"
      ]
    },
    "careerSite": {
      "logoUrl": "https://res.cloudinary.com/example/company-logo.webp",
      "heroImageUrl": "https://res.cloudinary.com/example/cover-1.webp"
    },
    "updatedAt": "2026-08-31T10:00:00"
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Chỉ cho phép cập nhật liên hệ, địa chỉ, ngành nghề, ngành nghề chính, quy mô, slogan, giới thiệu và logo/ảnh bìa.",
  "data": null
}
```

Request từ HR không có quyền Admin trả `403 Forbidden` theo `BaseResponse` hiện hành.
