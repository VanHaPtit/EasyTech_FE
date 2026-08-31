# Task BE API: API Update Profile

## Mục đích
Cung cấp API backend phục vụ US-03 - HR onboarding với contract rõ ràng và validate tại server.

## User Story liên quan
- US-03 - HR Onboarding.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập, Company = `ACTIVE` và User = `ACTIVE` trước khi cập nhật onboarding/profile.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `PATCH`

## Endpoint
- `/api/v1/company-profiles/me`

## Request
- Thông tin hồ sơ công ty cần cập nhật: businessType, industry, companySize, address, contact, website.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Company profile sau khi cập nhật.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Có thể cập nhật `profileCompleted`; không đổi Company Status.

## Side Effects
- Lưu hồ sơ onboarding/settings.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract
**Endpoint:** `PATCH /api/v1/company-profiles/me`
### Request Body
```json
{
  "industry": "Information Technology",
  "companySize": "51-200",
  "website": "https://techa.vn",
  "description": "Company description...",
  "phone": "0901234567",
  "address": "123 Nguyen Hue, TP. HCM",
  "logoUrl": "/uploads/company-logos/10/logo.webp",
  "primaryColor": "#47b1de",
  "benefits": "BHXH, Remote...",
  "businessType": "Software"
}
```
### Response (200 OK)
```json
{
  "status": 1,
  "message": "Cập nhật hồ sơ công ty thành công",
  "data": {
    "id": 10,
    "name": "TechA Solutions",
    "taxCode": "0123456789",
    "phone": "0901234567",
    "email": "hr@techa.com",
    "website": "https://techa.vn",
    "address": "123 Nguyen Hue, TP. HCM",
    "status": "ACTIVE",
    "profile": {
      "id": 5,
      "industry": "Information Technology",
      "companySize": "51-200",
      "description": "Company description...",
      "logoUrl": "/uploads/company-logos/10/logo.webp",
      "primaryColor": "#47b1de",
      "onboardingCompleted": false,
      "profileCompleted": false
    }
  }
}
```

