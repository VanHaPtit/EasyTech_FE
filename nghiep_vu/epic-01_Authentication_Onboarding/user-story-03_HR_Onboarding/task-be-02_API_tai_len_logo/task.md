# Task BE API: Tải lên logo công ty trong onboarding

## Mục đích
Xác định phạm vi backend cho task 'API tai len logo' trong US-03 HR Onboarding, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

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
