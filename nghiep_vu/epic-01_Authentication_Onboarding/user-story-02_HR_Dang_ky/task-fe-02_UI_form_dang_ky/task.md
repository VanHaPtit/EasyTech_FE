# task-fe-02_UI_form_dang_ky

## Mục đích
Xác định phạm vi frontend cho task 'UI form dang ky' trong US-02 HR Dang ky, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Hiển thị giao diện và trạng thái tương ứng với nghiệp vụ của user story, gồm loading, empty, success và error state khi cần.
- Thu thập dữ liệu người dùng, validate ở mức UI để cải thiện trải nghiệm và gọi đúng API dependency đã mô tả.
- Hiển thị phản hồi rõ ràng cho người dùng, giữ dữ liệu đang nhập khi có lỗi hợp lệ và điều hướng theo đúng flow nghiệp vụ.
- Không tự quyết định trạng thái nghiệp vụ nhạy cảm; frontend tuân theo response và quyền do backend trả về.

## Screen/Component

- Chuẩn hóa 22/10/2026: ba bước dùng chung schema tài khoản, công ty và địa chỉ/liên hệ; dữ liệu form dùng React Hook Form. Quay lại giữ bản nhập, lỗi backend vẫn được hiển thị; backend là nơi xác minh mã địa giới/uniqueness cuối cùng. Không thêm trường bắt buộc cho hồ sơ tùy chọn.
- Component chính: Đăng ký Form.
- Hiển thị trong đúng route/layout của epic hiện tại.
- Dữ liệu phải tôn trọng multi-tenant và role hiện tại.

## Hành động của user
- Người dùng mở màn hình và hoàn thành form đăng ký gồm 3 bước; riêng thông tin doanh nghiệp được tách thành 2 bước nhập theo thứ tự của màn hình cập nhật:
  - Bước 1 — Người đại diện: Giữ các trường tài khoản HR hiện có (Họ tên, Chức vụ, Phòng ban, Email và Mật khẩu).
  - Bước 2 — Thông tin công ty: Tên công ty, MST và Năm thành lập là bắt buộc; lĩnh vực hoạt động, ngành nghề chính, quy mô, slogan và giới thiệu là tùy chọn.
  - Bước 3 — Địa chỉ & liên hệ: Địa chỉ chi tiết, Tỉnh/Thành phố, Xã/Phường, điện thoại doanh nghiệp và website là tùy chọn. Tỉnh và xã có thể cùng để trống nhưng phải chọn đủ cặp nếu sử dụng.

## Hành vi UI
- Hiển thị Stepper/Wizard: Người đại diện → Thông tin công ty → Địa chỉ & liên hệ. Bước cuối là bước nhập, không thêm màn hình xác nhận riêng.
- Validate dữ liệu của từng bước trước khi chuyển tiếp, chặn chuyển bước nếu không hợp lệ và hiển thị lỗi phù hợp.
- Chỉ nút "Hoàn tất Đăng ký" ở bước 3 mới gọi API đăng ký. Quay lại các bước trước giữ nguyên dữ liệu đã nhập; API thất bại cũng không xóa dữ liệu.
- Khi chuyển bước, đưa vùng form về đầu và focus tiêu đề của bước để hỗ trợ bàn phím và màn hình nhỏ.
- Vô hiệu hóa nút submit trong lúc request đang chạy để tránh gửi lặp.
- Không tự sinh/gửi subdomain khi đăng ký; URL Career Site dùng slug do backend cấp. Resubmit cho alias legacy tùy chọn, không gắn dấu bắt buộc hoặc tự xóa alias khi bỏ field.
- Không hiển thị dấu `*` ở trường hồ sơ tùy chọn; HR có thể để trống và bổ sung sau khi công ty được duyệt.
- Không hiển thị trường logo/ảnh bìa trong form đăng ký. HR cấu hình hoặc tải ảnh lên tại Cài đặt sau khi đăng nhập với quyền phù hợp.
- Dùng bộ chọn có tìm kiếm theo dữ liệu địa giới của hệ thống cho Tỉnh/Thành phố và Xã/Phường; chỉ cho chọn Xã/Phường sau khi chọn tỉnh.
- Tải danh mục địa giới qua API tra cứu public, không yêu cầu người dùng đăng nhập hoặc có refresh token.
- Khi đổi tỉnh, xóa lựa chọn Xã/Phường cũ. Địa chỉ chi tiết chỉ nhận số nhà/đường/ngõ, không ghép tên tỉnh hoặc xã/phường.
- Hiển thị trạng thái đang tải, lỗi tải kèm thao tác thử lại, và lỗi hợp lệ ngay dưới từng bộ chọn; tỉnh/xã có thể cùng để trống nhưng phải chọn đủ cặp nếu sử dụng. Giữ các lựa chọn còn hợp lệ khi request đăng ký thất bại.

## Validation
- Validate trường bắt buộc ngay trên FE để cải thiện UX; trường tùy chọn chỉ được validate định dạng khi người dùng đã nhập.
- Không coi FE validation là source-of-truth; BE vẫn phải validate lại.
- Hiển thị lỗi gần trường nhập liệu và không xóa dữ liệu user đã nhập khi validation không đạt.
- MST và Năm thành lập được nhập bắt buộc khi đăng ký. Trong màn hình gửi lại hồ sơ bị từ chối, hai trường đã có giá trị được hiển thị chỉ đọc; lý do từ chối không cho phép mở khóa để sửa. Nếu hồ sơ lịch sử thiếu một giá trị thì cho phép bổ sung giá trị đó một lần, sau đó hiển thị chỉ đọc.

## Phản hồi thành công
- Hiển thị toast hoặc trạng thái xác nhận sau khi hành động thành công.
- Điều hướng theo flow cụ thể của user story.

## Xử lý lỗi
- Hiển thị lỗi có thể hành động được: điều gì sai và user cần sửa gì.
- Nếu lỗi authz: Company = PENDING + User = PENDING redirect /pending; Company = REJECTED + User = PENDING redirect /registration/rejected; User = INACTIVE/BLOCKED thì từ chối truy cập.

## API dependency cụ thể
- `POST /api/v1/auth/login`, `POST /api/v1/auth/register`, `GET /api/v1/auth/me`, `POST /api/v1/auth/refresh` tùy màn hình.
