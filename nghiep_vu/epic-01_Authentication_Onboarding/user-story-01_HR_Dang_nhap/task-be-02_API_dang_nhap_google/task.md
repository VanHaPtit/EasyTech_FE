# task-be-02_API_dang_nhap_google

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-02 API dang nhap google.

## Mô tả chức năng chi tiết
Nhận Google OAuth Token từ Client, gọi lên Google API để verify token và lấy thông tin người dùng (Email, Tên, Avatar). Tìm kiếm email trong DB. Nếu chưa có, trả lỗi 'Email chưa đăng ký'. Nếu có, thực hiện cấp phát JWT tương tự API đăng nhập thường.

## Mục đích
Cung cấp API backend phục vụ US-01 - HR đăng nhập với contract rõ ràng và validate tại server.

## User Story liên quan
- US-01 - HR Dang nhap.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- Workspace authorization kiểm tra riêng: Company = ACTIVE và User = ACTIVE mới vào HR Workspace; Company = PENDING + User = PENDING redirect /pending; Company = REJECTED + User = PENDING redirect /registration/rejected; User = INACTIVE/BLOCKED bị từ chối truy cập.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/auth/google`

## Request
- `idToken` do Google Identity Services cấp.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Thông tin user hiện tại; token nội bộ được set bằng HttpOnly cookie.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không tự tạo company/user mới; chỉ cho user đã đăng ký đăng nhập.

## Side Effects
- Verify token với Google, set auth cookie và ghi log đăng nhập.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract

**Endpoint:** `POST /api/v1/auth/google`
**Mô tả:** Xác thực Google ID token cho tài khoản HR đã tồn tại. Google OAuth là phương thức bổ sung/future enhancement, không thay thế luồng duyệt doanh nghiệp.

### Request Body
```json
{
  "idToken": "google_id_token_string"
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Đăng nhập Google thành công",
  "data": {
    "tokenType": "Bearer",
    "expiresIn": 86400,
    "user": {
      "id": 1,
      "email": "hr@techa.com",
      "fullName": "Nguyen Van A",
      "role": "HR_ADMIN",
      "status": "ACTIVE",
      "companyId": 10,
      "companyName": "TechA Solutions",
      "companySlug": "techa-solutions",
      "companyStatus": "ACTIVE",
      "onboardingCompleted": false,
      "profileCompleted": false,
      "createdAt": "2026-08-31T10:00:00"
    }
  }
}
```

