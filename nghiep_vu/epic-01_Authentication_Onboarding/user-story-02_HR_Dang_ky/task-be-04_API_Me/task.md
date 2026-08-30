# Task BE API: API Me

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
