# Task FE: Trang onboarding HR

## Mục đích
Xây dựng màn hình onboarding 3 bước cho HR sau khi công ty và tài khoản đã được Admin phê duyệt, đúng với US-03.

## User Story liên quan
- US-03 - HR Onboarding.

## Screen/Component
- Route chính: `/onboarding`.
- Component chính: `OnboardingPage`.
- Các bước UI:
  - Bước 1: xác nhận/thêm thông tin công ty.
  - Bước 2: upload logo và thiết lập thương hiệu.
  - Bước 3: thông tin liên hệ tuyển dụng.

## Điều kiện hiển thị
- Nếu `Company.status = ACTIVE`, `User.status = ACTIVE` và `onboardingCompleted = false` thì redirect HR vào `/onboarding`.
- Nếu `onboardingCompleted = true` và HR truy cập `/onboarding`, redirect về `/dashboard`.
- Nếu Company/User chưa được duyệt hoặc bị khóa, không cho vào onboarding và điều hướng theo auth guard hiện tại.

## Hành động của user
- HR xem thông tin đã được pre-fill từ dữ liệu đăng ký.
- HR bổ sung website, ngành nghề, quy mô, mô tả, địa chỉ, email liên hệ.
- HR upload logo công ty ở bước 2 hoặc bỏ qua.
- HR nhấn "Hoàn tất Onboarding" ở bước 3.
- HR có thể nhấn "Bỏ qua, thiết lập sau" ở bất kỳ bước nào.

## Hành vi UI
- Pre-fill tên công ty, email, số điện thoại, mã số thuế từ API lấy thông tin hiện tại.
- Không yêu cầu nhập lại các dữ liệu đã có từ đăng ký.
- Hiển thị progress 3 bước.
- Chặn double submit khi request đang chạy.
- Nếu upload logo thành công, hiển thị preview logo mới.
- Nếu HR skip, redirect `/dashboard` và để Dashboard hiển thị reminder hoàn thiện hồ sơ.
- Nếu hoàn tất thành công, redirect `/dashboard`.

## Validation
- `website`: nếu nhập thì phải đúng định dạng URL.
- `phone`: nếu cho phép sửa thì phải đúng định dạng số điện thoại.
- `contactEmail`: nếu nhập thì phải đúng định dạng email.
- Logo: chỉ cho chọn ảnh `PNG`, `JPG`, `JPEG`, `WEBP`, dung lượng tối đa `2MB`.
- Không cho submit khi form đang gửi request.
- FE validation chỉ phục vụ UX; backend vẫn là nguồn kiểm tra cuối cùng.

## Phản hồi thành công
- Bước cập nhật profile: lưu dữ liệu và cho phép chuyển bước.
- Bước upload logo: hiển thị preview logo đã upload.
- Hoàn tất onboarding: hiển thị thông báo thành công và điều hướng `/dashboard`.
- Skip onboarding: set `onboardingCompleted = true`, điều hướng `/dashboard`.

## Xử lý lỗi
- Lỗi validation FE: hiển thị gần trường nhập liệu.
- Lỗi `401`: chuyển về `/login`.
- Lỗi `403`: hiển thị thông báo tài khoản chưa đủ điều kiện onboarding hoặc chuyển theo guard.
- Lỗi upload logo: giữ nguyên dữ liệu form, hiển thị message từ API.
- Lỗi hệ thống: hiển thị toast rõ ràng và cho phép thử lại.

## API dependency cụ thể
- `GET /api/v1/companies/me` để lấy dữ liệu pre-fill.
- `PATCH /api/v1/company-profiles/me` để lưu thông tin onboarding, hoàn tất hoặc skip.
- `POST /api/v1/company-profiles/me/logo` để upload logo.
