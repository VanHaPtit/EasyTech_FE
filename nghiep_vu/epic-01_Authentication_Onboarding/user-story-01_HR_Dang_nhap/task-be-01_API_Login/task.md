# Task BE API: API Login

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
- `/api/v1/auth/login`

## Request
- `email`, `password`; không nhận Company/User status từ client.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Thông tin user hiện tại; access/refresh token được set bằng HttpOnly cookie.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không đổi trạng thái; chỉ tạo phiên đăng nhập nếu đủ điều kiện workspace.

## Side Effects
- Set auth cookie và ghi log đăng nhập.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract
**Endpoint:** `POST /api/v1/auth/login`
### Request Body
```json
{
  "email": "hr@techa.com",
  "password": "SecurePassword123!"
}
```
### Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "token": "jwt_token_string",
    "user": {
      "id": "uuid",
      "email": "hr@techa.com",
      "role": "HR",
      "status": "ACTIVE"
    },
    "company": {
      "id": "uuid",
      "status": "ACTIVE"
    }
  }
}
```

