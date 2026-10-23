# Task FE: Trang onboarding HR

## Mục đích
Xác định phạm vi frontend cho task 'UI trang onboarding' trong US-03 HR Onboarding, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Hiển thị giao diện và trạng thái tương ứng với nghiệp vụ của user story, gồm loading, empty, success và error state khi cần.
- Thu thập dữ liệu người dùng, validate ở mức UI để cải thiện trải nghiệm và gọi đúng API dependency đã mô tả.
- Hiển thị phản hồi rõ ràng cho người dùng, giữ dữ liệu đang nhập khi có lỗi hợp lệ và điều hướng theo đúng flow nghiệp vụ.
- Không tự quyết định trạng thái nghiệp vụ nhạy cảm; frontend tuân theo response và quyền do backend trả về.

## User Story liên quan
- US-03 - HR Onboarding.

## Screen/Component
- Route chính: `/onboarding`.
- Component chính: `OnboardingPage`.
- Các bước UI:
  - Bước 1: xác nhận/thêm thông tin công ty, logo/ảnh bìa tùy chọn.
  - Bước 2: địa chỉ/liên hệ và cấu hình SMTP lần đầu.
  - Bước 3: xác nhận rồi hoàn tất.

## Điều kiện hiển thị
- Nếu `Company.status = ACTIVE`, `User.status = ACTIVE` và `onboardingCompleted = false` thì redirect HR vào `/onboarding`.
- Nếu `onboardingCompleted = true` và HR truy cập `/onboarding`, redirect về `/dashboard`.
- Nếu Company/User chưa được duyệt hoặc bị khóa, không cho vào onboarding và điều hướng theo auth guard hiện tại.

## Hành động của user
- HR xem thông tin đã được pre-fill từ dữ liệu đăng ký.
- HR_ADMIN bổ sung website, ngành nghề, quy mô, mô tả, địa chỉ và cấu hình email gửi thông báo. Không có ô sửa `contactEmail`; backend lấy email tài khoản đăng ký khi thiếu.
- HR_ADMIN có thể upload logo công ty trong bước thông tin; không bắt buộc logo.
- HR nhấn "Hoàn tất Onboarding" ở bước 3.
- Không có thao tác "Bỏ qua, thiết lập sau" theo quyết định 21/10/2026. Bắt buộc lĩnh vực và cặp email gửi/App Password hợp lệ lần đầu; các trường hồ sơ tùy chọn không tự trở thành bắt buộc.

## Hành vi UI
- Pre-fill tên công ty, email, số điện thoại, mã số thuế từ API lấy thông tin hiện tại.
- Không yêu cầu nhập lại các dữ liệu đã có từ đăng ký.
- Hiển thị progress 3 bước.
- Chặn double submit khi request đang chạy.
- Nếu upload logo thành công, hiển thị preview logo mới.
- Không tự gửi `onboardingCompleted=true` hoặc `contactEmail`; chỉ redirect sau khi backend lưu thành công và refresh phiên/profile.
- Nếu hoàn tất thành công, redirect `/dashboard`.

## Validation
- `website`: nếu nhập thì phải đúng định dạng URL.
- `phone`: nếu cho phép sửa thì phải đúng định dạng số điện thoại.
- `mailEmail`/`mailPassword`: bắt buộc khi hoàn tất lần đầu; không hiển thị lại password đã lưu. Backend kiểm tra SMTP, UI giữ ngữ cảnh khi lỗi.
- Logo: chỉ cho chọn ảnh `PNG`, `JPG`, `JPEG`, `WEBP`, dung lượng tối đa `2MB`.
- Không cho submit khi form đang gửi request.
- FE validation chỉ phục vụ UX; backend vẫn là nguồn kiểm tra cuối cùng.

## Phản hồi thành công
- Bước cập nhật profile: lưu dữ liệu và cho phép chuyển bước.
- Bước upload logo: hiển thị preview logo đã upload.
- Hoàn tất onboarding: hiển thị thông báo thành công và điều hướng `/dashboard`.
- Không có Skip; cờ hoàn tất do backend trả về.

## Xử lý lỗi
- Lỗi validation FE: hiển thị gần trường nhập liệu.
- Lỗi `401`: chuyển về `/login`.
- Lỗi `403`: hiển thị thông báo tài khoản chưa đủ điều kiện onboarding hoặc chuyển theo guard.
- Lỗi upload logo: giữ nguyên dữ liệu form, hiển thị message từ API.
- Lỗi hệ thống: hiển thị toast rõ ràng và cho phép thử lại.

## API dependency cụ thể
- `GET /api/v1/companies/me` để lấy dữ liệu pre-fill.
- `PATCH /api/v1/company-profiles/me` để lưu và để backend xác định hoàn tất onboarding; không có request Skip.
- `POST /api/v1/company-profiles/me/logo` để upload logo.
