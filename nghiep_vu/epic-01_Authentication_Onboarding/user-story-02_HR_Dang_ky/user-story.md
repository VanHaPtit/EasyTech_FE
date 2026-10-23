# 📋 User Story 02: HR Đăng Ký (Company Registration)

## 1. MÔ TẢ USER STORY
- **Là** Nhà tuyển dụng (HR) chưa có tài khoản,
- **Tôi muốn** đăng ký công ty và tài khoản HR của mình,
- **Để** tôi có thể bắt đầu sử dụng hệ thống sau khi được Admin phê duyệt và không cần hiểu các khái niệm kỹ thuật.
- **Story Points:** 3

## SƠ ĐỒ LUỒNG NGHIỆP VỤ (Business Flow)

```mermaid
graph TD
    A[Mở form Đăng ký] --> B[Bước 1: Thông tin người đại diện]
    B --> C[Bước 2: Thông tin công ty]
    C --> D[Bước 3: Địa chỉ & liên hệ]
    D --> E{Hệ thống Validate}
    
    E -- Thiếu/Sai --> F[Báo lỗi Validation tại field]
    E -- Hợp lệ --> G[Gọi API Đăng ký]
    
    G --> H{Kiểm tra trùng lặp DB}
    H -- Trùng Email HR --> I[Lỗi: Email đã được sử dụng]
    H -- Trùng Mã số thuế --> J[Lỗi: Mã số thuế đã tồn tại]
    H -- Client legacy gửi alias trùng --> K[Lỗi: Subdomain đã có người dùng]
    
    H -- Hợp lệ --> L[Tạo DB: Company=PENDING, User=HR_ADMIN/PENDING]
    L --> M[Gửi Email xác nhận & Thông báo Admin]
    M --> N[Chuyển hướng trang Chờ duyệt]
```

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: Đăng ký thành công với thông tin hợp lệ (Form 3 bước)**
  - **VỚI ĐIỀU KIỆN** người dùng chưa có tài khoản trên hệ thống.
  - **KHI** người dùng nhập các trường bắt buộc:
    - **Bước 1 (Thông tin người đại diện):** Họ tên, chức vụ, Email đăng nhập và Mật khẩu (≥ 8 ký tự, có chữ hoa + số); phòng ban là tùy chọn.
    - **Bước 2 (Thông tin công ty):** Tên công ty, Mã số thuế và Năm thành lập là bắt buộc; lĩnh vực hoạt động, ngành nghề chính (`businessType`), quy mô, slogan và giới thiệu là tùy chọn.
    - `companySize` khi cung cấp chỉ nhận `1-10`, `11-50`, `51-200`, `201-500`, `501-1000`, `1001+`; không cho đăng ký mới với khoảng legacy. Bỏ trống không cản đăng ký.
    - **Bước 3 (Địa chỉ & liên hệ):** Địa chỉ chi tiết, Tỉnh/Thành phố, Xã/Phường, điện thoại doanh nghiệp và website đều tùy chọn. Tỉnh và xã có thể cùng để trống; nếu cung cấp thì phải chọn đủ cặp hợp lệ.
  - Phần đăng ký thông tin doanh nghiệp được chia thành hai bước nhập theo cùng thứ tự với màn hình cập nhật: Thông tin công ty → Địa chỉ & liên hệ. Bước thông tin người đại diện vẫn nằm ở đầu luồng. Trường tùy chọn không hiển thị dấu `*`.
  - Các nút "Tiếp tục" chỉ chuyển bước và validate dữ liệu của bước hiện tại; chưa gửi API đăng ký. Quay lại bước trước giữ nguyên dữ liệu đã nhập.
  - Logo và ảnh bìa không hiển thị trong form đăng ký; HR cấu hình hoặc tải ảnh lên trong Cài đặt sau khi công ty được duyệt.
  - Backend tự tạo `companies.slug` unique từ tên công ty cho URL public. Frontend không tự tạo/gửi subdomain; `subdomain` chỉ còn là alias nullable tương thích client/dữ liệu cũ.
  - **VÀ** nhấn "Hoàn tất Đăng ký" ở bước 3. Đây là bước nhập địa chỉ/liên hệ, không thêm màn hình rà soát riêng.
  - **THÌ** hệ thống tạo bản ghi trong bảng `companies` với `status = PENDING` và `users` với `role = HR_ADMIN`, `status = PENDING` (liên kết qua `company_id`).
  - Hệ thống gửi email xác nhận đến HR và gửi yêu cầu phê duyệt đến Admin.
  - HR được chuyển đến trang Chờ duyệt.
  - Địa chỉ chi tiết chỉ gồm số nhà/đường/ngõ; mã tỉnh và mã xã/phường được lưu riêng vào `companies.province_code` và `companies.ward_code`. Cả hai có thể cùng để trống; nếu cung cấp thì phải chọn đủ cặp hợp lệ.
  - Mã số thuế và Năm thành lập là bắt buộc khi đăng ký và cố định ngay sau khi hồ sơ được tạo; HR không thể đổi hai trường này trong onboarding hoặc khi gửi lại hồ sơ bị từ chối.

- **Kịch bản 1a: Chọn địa giới đăng ký hợp lệ**
  - **VỚI ĐIỀU KIỆN** HR đang nhập địa chỉ và liên hệ ở bước 3.
  - **KHI** HR chọn Tỉnh/Thành phố rồi chọn Xã/Phường thuộc tỉnh đó.
  - **THÌ** form lưu hai mã lựa chọn riêng; đổi Tỉnh/Thành phố sẽ xóa Xã/Phường đã chọn trước đó.
  - Backend chỉ chấp nhận mã tỉnh và mã xã/phường hợp lệ, đồng thời xác minh xã/phường thuộc tỉnh đã gửi.

- **Kịch bản 2: Trang chờ duyệt**
  - **VỚI ĐIỀU KIỆN** đăng ký đã được tạo thành công.
  - **KHI** HR xem màn hình Chờ duyệt.
  - **THÌ** màn hình hiển thị: đơn đăng ký đã được tiếp nhận, doanh nghiệp đang chờ review, trạng thái hiện tại, email nhận thông báo, CTA kiểm tra lại trạng thái, và nút đăng xuất.
  - Không hiển thị màn hình rỗng chỉ có câu "Đang chờ phê duyệt" mà không có thông tin rõ ràng.

- **Kịch bản 3: Validation lỗi trực tiếp (Inline Validation)**
  - **VỚI ĐIỀU KIỆN** người dùng bỏ trống trường bắt buộc hoặc nhập sai định dạng (vd: mật khẩu yếu, email sai định dạng, MST/năm thành lập không hợp lệ); trường tùy chọn có thể để trống nhưng nếu được nhập thì vẫn phải đúng định dạng.
  - **KHI** người dùng chuyển bước hoặc nhấn "Hoàn tất Đăng ký" ở bước 3.
  - **THÌ** form hiển thị lỗi màu đỏ tại từng trường bị sai và chặn không cho sang bước tiếp theo hoặc không cho submit.

- **Kịch bản 4: Xử lý lỗi dữ liệu trùng lặp (Email / MST / Subdomain)**
  - **VỚI ĐIỀU KIỆN** Email HR, Mã số thuế, hoặc alias Subdomain do client legacy gửi đã tồn tại trên hệ thống. Form mới không yêu cầu/không tự sinh alias.
  - **KHI** người dùng nhấn "Đăng ký".
  - **THÌ** hệ thống hiển thị thông báo lỗi rõ ràng tương ứng:
    - _"Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác."_
    - _"Mã số thuế này đã được đăng ký. Vui lòng liên hệ hỗ trợ nếu có nhầm lẫn."_
    - _"Subdomain này đã được sử dụng. Vui lòng chọn một subdomain khác."_

- **Kịch bản 5: Bị từ chối → chỉnh sửa + gửi lại**
  - **VỚI ĐIỀU KIỆN** Company đang ở trạng thái `REJECTED`. HR đang ở trang `/registration/rejected`.
  - **KHI** HR nhấn CTA "Chỉnh sửa & Gửi lại hồ sơ".
  - **THÌ** hệ thống mở form chỉnh sửa, **status KHÔNG thay đổi trong khi HR đang edit** (vẫn là `REJECTED`).
  - HR có thể chỉnh sửa các thông tin được phép nhưng không được đổi Email đăng nhập, Mã số thuế hoặc Năm thành lập đã được lưu; lý do từ chối không mở ngoại lệ cho hai trường cố định.
  - Với hồ sơ lịch sử chưa có MST hoặc Năm thành lập, HR được bổ sung giá trị còn thiếu một lần khi gửi lại; sau đó giá trị được cố định.
  - **KHI** HR nhấn nút "Xác nhận gửi lại" (confirmation action cuối), hệ thống hiển thị modal xác nhận: _"Bạn sắp gửi lại hồ sơ đăng ký. Hồ sơ sẽ vào hàng chờ xem xét của Admin."_
  - **Sau khi HR confirm:** Hệ thống gọi API → `Company.status = PENDING`, `User.status = PENDING`, hồ sơ xuất hiện lại trong danh sách Admin.
  - HR được redirect về trang Chờ duyệt (`/pending`).

## 3. BUSINESS RULES

### Company & User Creation
- Quá trình đăng ký phải tạo **Company** (`status = PENDING`) và **User** (`role = HR_ADMIN`, `status = PENDING`) trong cùng một Transaction (nếu lỗi thì rollback toàn bộ).
- Cả Company và User phải cùng được Admin duyệt trước khi activate.
- Khi Admin approve: Company = ACTIVE, User = ACTIVE.
- Khi Admin reject: Company = REJECTED, User = PENDING (restricted).

### Auto-fill & Gợi ý dữ liệu
- Chốt 21/10/2026: slug do backend cấp là định danh public chuẩn. Request đăng ký mới bỏ subdomain; client cũ có gửi alias vẫn được kiểm tra format/unique. Không đổi hoặc xóa alias legacy khi bỏ field khỏi request gửi lại hồ sơ. Slug hiện có không đổi khi sửa tên công ty.
- Email liên hệ của công ty nếu để trống sẽ tự động lấy Email đăng nhập của HR.

### Approval & Resubmit Trigger Rule
- Đăng ký phải đi qua kênh duyệt; không được cho phép company vào Dashboard ngay sau khi đăng ký.
- Nếu `company.status = REJECTED`, HR không được dead-end. Phải có route để xem lý do, sửa, resubmit.
- Status CHỈ chuyển về `PENDING` sau khi HR nhấn nút "Xác nhận gửi lại" trong confirmation modal — không phải khi mở form edit.
- Trong thời gian HR đang edit form (chưa confirm), Company và User vẫn ở trạng thái `REJECTED`.
- Nếu HR đóng tab/thoát khỏi form mà chưa confirm, không có thay đổi status nào xảy ra.
- Khi gửi lại hồ sơ chính thức thành công: Company = PENDING, User = PENDING, luồng duyệt được lặp lại.

### Auth Method
- Google OAuth chỉ là phương thức auth bổ sung trong tương lai. Trọng tâm MVP là email/password.

### Thông tin doanh nghiệp cố định
- `taxCode` và `foundedYear` là bắt buộc trong đăng ký mới và không được sửa sau khi tạo hồ sơ, bất kể trạng thái duyệt hay nội dung lý do từ chối.
- API gửi lại hồ sơ phải giữ nguyên giá trị đã có. Chỉ dữ liệu lịch sử đang null mới được phép bổ sung giá trị còn thiếu một lần; sau khi có giá trị, mọi lần gửi lại tiếp theo phải giữ nguyên.

## 4. NGOÀI PHẠM VI
- **KHÔNG** hỗ trợ đăng ký cho ứng viên (Candidate) – ứng viên không cần tài khoản.
- **KHÔNG** tự động kích hoạt tài khoản – phải qua bước Admin phê duyệt.
- Xác thực email qua OTP/link là cải tiến trong tương lai, không bắt buộc trong MVP.
