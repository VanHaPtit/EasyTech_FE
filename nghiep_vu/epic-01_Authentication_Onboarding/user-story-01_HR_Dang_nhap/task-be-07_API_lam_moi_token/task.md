# task-be-07_API_lam_moi_token

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-07 API lam moi token.

## Mô tả chức năng chi tiết
Nhận Refresh Token từ Cookie (HttpOnly) hoặc Request Body, kiểm tra tính hợp lệ và thời hạn trong DB (hoặc Cache). Nếu hợp lệ, sinh ra một Access Token mới kèm thời gian sống ngắn hạn để tiếp tục phiên làm việc mà không bắt User đăng nhập lại.

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
- `/api/v1/auth/refresh`

## Request
- Refresh token lấy từ HttpOnly cookie.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Access token mới được set lại bằng HttpOnly cookie.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không đổi trạng thái nghiệp vụ.

## Side Effects
- Gia hạn phiên đăng nhập hợp lệ.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.
