# Task BE API: Cập nhật hồ sơ công ty trong onboarding

## Mục đích
Cung cấp API để HR cập nhật thông tin hồ sơ công ty trong luồng onboarding US-03 sau khi tài khoản và công ty đã được Admin phê duyệt.

## User Story liên quan
- US-03 - HR Onboarding.

## Điều kiện tiên quyết
- HR đã đăng nhập.
- `Company.status = ACTIVE`.
- `User.status = ACTIVE`.
- Dữ liệu cập nhật phải thuộc đúng `company_id` của HR hiện tại.

## HTTP Method
- `PATCH`

## Endpoint
- `/api/v1/company-profiles/me`

## Request
- Thông tin bổ sung cho hồ sơ công ty ở bước 1 và bước 3 của onboarding.
- Không nhận các trạng thái do hệ thống quản lý như `company.status`, `user.status`.
- `onboardingCompleted` chỉ được set `true` khi HR nhấn "Hoàn tất Onboarding" hoặc "Bỏ qua, thiết lập sau".

## Validation
- `website`: nếu có thì phải đúng định dạng URL.
- `companySize`: nếu có thì phải thuộc enum/quy ước quy mô công ty được backend hỗ trợ.
- `phone`: nếu có thì phải đúng định dạng số điện thoại.
- `address`, `description`, `benefits`, `businessType`, `industry`: kiểm tra độ dài tối đa theo schema.
- Chỉ User `ACTIVE` mới được cập nhật hoặc hoàn tất onboarding.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: trả về `BaseResponse(status = 1, message, data)` với thông tin công ty và profile mới nhất.
- Thất bại: trả về `BaseResponse(status = 0, message, data = null)` với message rõ nguyên nhân.

## State Transition
- Nếu request đánh dấu hoàn tất hoặc skip onboarding thì set `onboardingCompleted = true`.
- Không đổi `Company.status`.
- Không reset `onboardingCompleted` về `false` khi HR chỉnh sửa thông tin sau này.

## Side Effects
- Cập nhật `company_profiles` và/hoặc thông tin công ty liên quan.
- Dữ liệu sau cập nhật được dùng để hiển thị trên Dashboard và Career Site.

## Các trường hợp lỗi
- `400`: request không hợp lệ hoặc enum/format sai.
- `401`: chưa đăng nhập hoặc token không hợp lệ.
- `403`: User/Company chưa ACTIVE hoặc không thuộc workspace hiện tại.
- `404`: không tìm thấy company/profile trong phạm vi tenant hiện tại.

## API JSON Contract

**Endpoint:** `PATCH /api/v1/company-profiles/me`

### Request Body
```json
{
  "industry": "Information Technology",
  "companySize": "51-200",
  "website": "https://techa.vn",
  "description": "Công ty phát triển phần mềm tuyển dụng.",
  "phone": "0901234567",
  "address": "123 Nguyễn Huệ, TP. HCM",
  "primaryColor": "#47b1de",
  "benefits": "BHXH, làm việc hybrid",
  "businessType": "Software",
  "contactEmail": "hr@techa.com",
  "onboardingCompleted": true
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
    "address": "123 Nguyễn Huệ, TP. HCM",
    "status": "ACTIVE",
    "profile": {
      "id": 5,
      "industry": "Information Technology",
      "companySize": "51-200",
      "description": "Công ty phát triển phần mềm tuyển dụng.",
      "primaryColor": "#47b1de",
      "benefits": "BHXH, làm việc hybrid",
      "businessType": "Software",
      "contactEmail": "hr@techa.com",
      "onboardingCompleted": true,
      "profileCompleted": true
    }
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Tài khoản chưa đủ điều kiện cập nhật onboarding.",
  "data": null
}
```
