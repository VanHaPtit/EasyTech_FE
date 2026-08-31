# Task BE API: API Upload Logo

## Mục đích
Cung cấp API backend phục vụ US-03 - HR onboarding với contract rõ ràng và validate tại server.

## User Story liên quan
- US-03 - HR Onboarding.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập, Company = `ACTIVE` và User = `ACTIVE` trước khi cập nhật onboarding/profile.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/company-profiles/me/logo`

## Request
- Multipart file logo.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); URL logo và company profile mới nhất.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không đổi trạng thái duyệt công ty.

## Side Effects
- Lưu file vào storage và cập nhật logoUrl.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract

**Endpoint:** `POST /api/v1/company-profiles/me/logo`
**Mô tả:** Upload logo công ty trong onboarding. Logo là optional.

### Request Body
`multipart/form-data` với field `file`.

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
      "onboardingCompleted": false,
      "profileCompleted": false
    }
  }
}
```

