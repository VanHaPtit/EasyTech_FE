# Task BE API: Tải lên logo công ty trong onboarding

## Mục đích
Cung cấp API để HR upload logo công ty ở bước 2 onboarding US-03. Logo này là logo public dùng cho Career Site.

## User Story liên quan
- US-03 - HR Onboarding.

## Điều kiện tiên quyết
- HR đã đăng nhập.
- `Company.status = ACTIVE`.
- `User.status = ACTIVE`.
- Dữ liệu upload phải thuộc đúng `company_id` của HR hiện tại.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/company-profiles/me/logo`

## Request
- `multipart/form-data` với field `file`.
- Logo là optional; HR có thể bỏ qua bước upload logo.

## Validation
- Chỉ nhận file ảnh `PNG`, `JPG`, `JPEG` hoặc `WEBP`.
- Dung lượng tối đa `2MB`.
- Không nhận file rỗng, file sai MIME type hoặc phần mở rộng không hợp lệ.
- Chỉ User `ACTIVE` mới được upload logo onboarding.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: trả về `BaseResponse(status = 1, message, data)` với URL logo và profile mới nhất.
- Thất bại: trả về `BaseResponse(status = 0, message, data = null)` với message rõ nguyên nhân.

## State Transition
- Không đổi `Company.status`.
- Không tự set `onboardingCompleted = true`; việc hoàn tất/skip onboarding thuộc API cập nhật profile.

## Side Effects
- Lưu file vào storage.
- Cập nhật logo public vào `career_site_settings.logo_url` hoặc field profile/career site tương ứng theo thiết kế DB.
- Không ghi đè logo nội bộ Dashboard nếu hệ thống tách `companies.logo_url` và `career_site_settings.logo_url`.

## Các trường hợp lỗi
- `400`: file thiếu, sai định dạng hoặc vượt quá dung lượng.
- `401`: chưa đăng nhập hoặc token không hợp lệ.
- `403`: User/Company chưa ACTIVE hoặc không thuộc workspace hiện tại.
- `415`: MIME type không được hỗ trợ.

## API JSON Contract

**Endpoint:** `POST /api/v1/company-profiles/me/logo`

### Request Body
`multipart/form-data` với field:

```text
file=<binary image>
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Tải logo công ty thành công",
  "data": {
    "id": 10,
    "name": "TechA Solutions",
    "status": "ACTIVE",
    "profile": {
      "id": 5,
      "logoUrl": "/uploads/company-logos/10/logo.webp",
      "careerSiteLogoUrl": "/uploads/company-logos/10/logo.webp",
      "onboardingCompleted": false,
      "profileCompleted": false
    }
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Logo không hợp lệ hoặc vượt quá dung lượng cho phép.",
  "data": null
}
```
