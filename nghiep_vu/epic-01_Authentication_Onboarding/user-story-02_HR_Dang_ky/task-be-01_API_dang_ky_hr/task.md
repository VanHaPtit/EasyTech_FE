# task-be-01_API_dang_ky_hr

## Mục đích
Xác định phạm vi backend cho task 'API dang ky hr' trong US-02 HR Dang ky, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

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
- Thông tin HR (Họ tên, email, password) và Thông tin công ty (Tên công ty, Mã số thuế, Số điện thoại, Địa chỉ, Subdomain).

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


## 3. API JSON Contract
**Endpoint:** `POST /api/v1/auth/register`
### Request Body
```json
{
  "email": "hr@techa.com",
  "password": "SecurePassword123!",
  "fullName": "Nguyen Van A",
  "companyName": "TechA Solutions",
  "taxCode": "0123456789",
  "phone": "0987654321",
  "address": "123 Tech Street, HN",
  "subdomain": "techa",
  "website": "https://techa.com",
  "industry": "IT - Software",
  "companySize": "50-100",
  "description": "TechA Solutions is a leading tech company...",
  "logoUrl": "https://s3.techa.com/logo.png"
}
```
### Response (201 Created)
```json
{
  "status": 1,
  "message": "Đăng ký thành công, hồ sơ đang chờ Admin phê duyệt",
  "data": {
    "email": "hr@techa.com",
    "companyName": "TechA Solutions",
    "companyStatus": "PENDING"
  }
}
```

---

## Thiết kế Database – Bảng users

## Bảng/entity liên quan
- Bảng chính: `users`, `companies`, `company_profiles`, `refresh_tokens`.
- Mỗi bảng phải có id làm Primary Key, created_at, updated_at và is_deleted nếu cần xóa mềm.
- Các bảng thuộc tenant phải có company_id và index theo company_id.

## Column và kiểu dữ liệu
- Dùng UUID cho khóa chính/khóa ngoại.
- Dùng VARCHAR cho mã, email, slug, enum dạng text.
- Dùng TEXT cho nội dung dài như mô tả, lý do từ chối, email body hoặc AI explanation.
- Dùng TIMESTAMP cho thời điểm tạo/cập nhật/gửi email/đánh giá.
- - Enum/status liên quan: Company Status = `PENDING`/`ACTIVE`/`REJECTED`; User Status = `PENDING`/`ACTIVE`/`INACTIVE`/`BLOCKED`.

## Khóa và ràng buộc
- Primary Key: id.
- Foreign Key: trỏ đúng entity cha, đặc biệt company_id, job_id, pplication_id, 
ound_id, user_id.
- Constraint bắt buộc cho field nghiệp vụ chính; không cho dữ liệu mồ côi giữa company, job, application và round.
- Unique index cho các mã định danh như email, tax code, slug hoặc template key theo phạm vi tenant nếu nghiệp vụ yêu cầu.

## Migration
- Tạo migration idempotent theo thứ tự triển khai.
- Có giá trị mặc định rõ ràng cho status và boolean flag.

## Relationship
- Dữ liệu phải giữ đúng multi-tenant boundary theo company_id.
- Xóa mềm không được làm mất audit/history cần phục vụ báo cáo hoặc truy vết.

---

## Thiết kế Database – Bảng companies

## Bảng/entity liên quan
- Bảng chính: `users`, `companies`, `company_profiles`, `refresh_tokens`.
- Mỗi bảng phải có id làm Primary Key, created_at, updated_at và is_deleted nếu cần xóa mềm.
- Các bảng thuộc tenant phải có company_id và index theo company_id.

## Column và kiểu dữ liệu
- Dùng UUID cho khóa chính/khóa ngoại.
- Dùng VARCHAR cho mã, email, slug, enum dạng text.
- Dùng TEXT cho nội dung dài như mô tả, lý do từ chối, email body hoặc AI explanation.
- Dùng TIMESTAMP cho thời điểm tạo/cập nhật/gửi email/đánh giá.
- - Enum/status liên quan: Company Status = `PENDING`/`ACTIVE`/`REJECTED`; User Status = `PENDING`/`ACTIVE`/`INACTIVE`/`BLOCKED`.

## Khóa và ràng buộc
- Primary Key: id.
- Foreign Key: trỏ đúng entity cha, đặc biệt company_id, job_id, pplication_id, 
ound_id, user_id.
- Constraint bắt buộc cho field nghiệp vụ chính; không cho dữ liệu mồ côi giữa company, job, application và round.
- Unique index cho các mã định danh như email, tax code, slug hoặc template key theo phạm vi tenant nếu nghiệp vụ yêu cầu.

## Migration
- Tạo migration idempotent theo thứ tự triển khai.
- Có giá trị mặc định rõ ràng cho status và boolean flag.

## Relationship
- Dữ liệu phải giữ đúng multi-tenant boundary theo company_id.
- Xóa mềm không được làm mất audit/history cần phục vụ báo cáo hoặc truy vết.
