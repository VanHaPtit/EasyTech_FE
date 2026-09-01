# task-be-04_API_thong_tin_ca_nhan

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-04 API thong tin ca nhan.

## Mô tả chức năng chi tiết
Endpoint `/api/v1/auth/me`. Backend lấy `userId` từ JWT trong Header (Bearer Token). Truy vấn DB để lấy thông tin chi tiết của người dùng (tên, avatar, quyền hạn) và thông tin cơ bản của công ty mà họ thuộc về, loại bỏ các trường nhạy cảm như mật khẩu trước khi trả về Client.

## Mục đích
Cung cấp API backend phục vụ US-02 - HR đăng ký với contract rõ ràng và validate tại server.

## User Story liên quan
- US-02 - HR Dang ky.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- Workspace authorization kiểm tra riêng: Company = ACTIVE và User = ACTIVE mới vào HR Workspace; Company = PENDING + User = PENDING redirect /pending; Company = REJECTED + User = PENDING redirect /registration/rejected; User = INACTIVE/BLOCKED bị từ chối truy cập.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `GET`

## Endpoint
- `/api/v1/auth/me`

## Request
- Không có body; đọc user từ phiên đăng nhập.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); User profile, role, Company Status, User Status và onboarding flag.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không đổi trạng thái.

## Side Effects
- Không có side effect ngoài logging kỹ thuật nếu cần.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract
**Endpoint:** `GET /api/v1/auth/me`
### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy thông tin người dùng thành công",
  "data": {
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
```

