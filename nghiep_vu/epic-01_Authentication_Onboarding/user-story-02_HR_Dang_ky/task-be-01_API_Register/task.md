# Task BE API: API Đăng ký

## Mục đích
Cung cấp API backend phục vụ US-02 - HR đăng ký với contract rõ ràng và validate tại server.

## User Story liên quan
- US-02 - HR Dang ky.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- Endpoint public; user chưa cần đăng nhập. Backend tự tạo Company = `PENDING` và User = `PENDING` sau khi validate thành công.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/auth/register`

## Request
- Thông tin HR, công ty, email, password, taxCode và các field đăng ký bắt buộc.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Registration response cho biết hồ sơ đã được ghi nhận và đang chờ duyệt.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Company = PENDING, User = PENDING.

## Side Effects
- Tạo company/profile/user, gửi email xác nhận nhận hồ sơ và thông báo Admin.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.
