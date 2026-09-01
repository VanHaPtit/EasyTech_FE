# Task DB: Hồ sơ doanh nghiệp phục vụ onboarding

## Mục đích
Xác định phạm vi backend cho task 'DB ho so doanh nghiep' trong US-03 HR Onboarding, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-03 - HR Onboarding.

## Bảng/entity liên quan
- `companies`: thông tin doanh nghiệp đã có từ bước đăng ký và trạng thái duyệt.
- `users`: tài khoản HR gắn với doanh nghiệp.
- `company_profiles`: hồ sơ bổ sung trong onboarding.
- `career_site_settings`: cấu hình public cho Career Site, bao gồm logo public.

## Nguyên tắc dữ liệu
- `Company.status` chỉ phản ánh trạng thái duyệt doanh nghiệp: `PENDING`, `ACTIVE`, `REJECTED`, `BLOCKED` nếu có.
- `User.status` chỉ phản ánh trạng thái tài khoản: `PENDING`, `ACTIVE`, `INACTIVE`, `BLOCKED`.
- `onboardingCompleted` là flag riêng, không dùng thay thế `Company.status` hoặc `User.status`.
- Dữ liệu đăng ký ban đầu như tên công ty, email, mã số thuế phải được pre-fill, không bắt HR nhập lại.

## Trường dữ liệu chính

### `companies`
- `id`
- `name`
- `email`
- `phone`
- `tax_code`
- `status`
- `logo_url` nếu dùng cho logo nội bộ Dashboard
- `created_at`
- `updated_at`

### `company_profiles`
- `id`
- `company_id`
- `industry`
- `company_size`
- `business_type`
- `website`
- `description`
- `benefits`
- `address`
- `contact_email`
- `primary_color`
- `onboarding_completed`
- `profile_completed`
- `created_at`
- `updated_at`

### `career_site_settings`
- `id`
- `company_id`
- `logo_url`
- `primary_color`
- `created_at`
- `updated_at`

## Khóa và ràng buộc
- `company_profiles.company_id` tham chiếu `companies.id`.
- `career_site_settings.company_id` tham chiếu `companies.id`.
- Mỗi company chỉ có một profile onboarding chính.
- Mỗi company chỉ có một cấu hình career site chính.
- Cần index theo `company_id` cho các bảng thuộc tenant.

## Migration
- Tạo migration idempotent.
- Nếu company đã tồn tại nhưng chưa có `company_profiles`, tạo profile mặc định khi HR bắt đầu onboarding hoặc khi gọi API `/company-profiles/me`.
- `onboarding_completed` mặc định `false`.
- `profile_completed` mặc định `false`.

## Relationship
- `companies` 1-1 `company_profiles`.
- `companies` 1-1 `career_site_settings`.
- Mọi truy vấn/update phải kiểm tra đúng tenant theo `company_id`.

## Quy tắc logo
- Logo upload ở onboarding dùng cho Career Site public: `career_site_settings.logo_url`.
- Logo nội bộ Dashboard có thể dùng `companies.logo_url` và được quản lý ở US-30 Company Settings.
- Nếu chưa upload logo public, Career Site dùng placeholder mặc định.
