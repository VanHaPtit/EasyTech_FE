# EPIC 01 — Authentication & Onboarding

## 1. Tóm tắt
- **Nghiệp vụ:** Đăng ký, duyệt doanh nghiệp, login, onboarding và khởi tạo hồ sơ công ty cho HR.
- **Luồng MVP chuẩn:**
  Đăng ký
  → Company = PENDING
  → User = PENDING
  → Chờ duyệt Approval
  → Admin xem xét
  → Duyệt: Company = ACTIVE, User = ACTIVE
  → Từ chối: Company = REJECTED, User = PENDING (restricted)
  → HR Login
  → Onboarding (3 steps)
  → Dashboard
- **Google OAuth:** `Future Enhancement` hoặc phương thức auth bổ sung; không thay thế flow phê duyệt hiện tại.

## 2. Giá trị nghiệp vụ và chỉ số
- **Giá trị nghiệp vụ:** Đảm bảo doanh nghiệp chỉ được sử dụng hệ thống sau khi được admin kiểm duyệt; giảm spam và tài khoản giả mạo.
- **Chỉ số:**
  - Tỷ lệ đăng ký thành công > 95%
  - Tỷ lệ company được duyệt trong SLA nội bộ đạt > 90%
  - Tỷ lệ HR hoàn thành onboarding trong 7 ngày >= 80%

## 3. Quy trình nghiệp vụ
```mermaid
graph TD
  A[HR đăng ký: Nhập thông tin HR và doanh nghiệp, gồm MST + năm thành lập] --> B[Company = PENDING, User = PENDING]
  B --> C[Chờ duyệt Page]
  C --> D[Admin xem xét & Kiểm chứng Mã số thuế]
  D --> E{Duyệt?}
  E -- Yes --> F[Company = ACTIVE, User = ACTIVE]
  F --> G[HR Login]
  G --> H[Onboarding: Thông tin → Thương hiệu → Liên hệ]
  H --> I[Dashboard]
  E -- No --> J[Company = REJECTED, User = PENDING]
  J --> K[HR xem lý do]
  K --> L[Chỉnh thông tin được phép + Resubmit]
  L --> C
```

## 4. Phạm vi và Backlog
| ID | Tên Story | Ưu tiên | Trạng thái |
|---|---|---|---|
| US-01 | HR đăng nhập | Must Have | To-do |
| US-02 | HR đăng ký | Must Have | To-do |
| US-03 | HR onboarding | Must Have | To-do |
| US-04 | Admin đăng nhập | Must Have | To-do |
| US-05 | HR quản lý mật khẩu | Must Have | To-do |

## 5. Business Rules

### Authentication vs Authorization
- **Authentication:** Credentials của HR hợp lệ → login thành công. Credentials sai → trả lỗi đăng nhập.
- **Authorization:** 
  - Company = ACTIVE, User = ACTIVE → workspace unrestricted → dashboard
  - Company = PENDING → xác thực thành công, nhưng bị chặn truy cập workspace → trang `/pending`
  - Company = REJECTED → xác thực thành công, nhưng bị chặn truy cập workspace → trang `/registration/rejected`
  - User = INACTIVE/BLOCKED → access denied, login rejected

### Registration & Approval Flow
- Khi đăng ký, HR bắt buộc cung cấp thông tin tài khoản, tên pháp lý công ty, Mã số thuế và Năm thành lập để Admin có cơ sở kiểm chứng.
- Các trường hồ sơ công ty được phép chỉnh sửa trong Cài đặt cũng có mặt ở form đăng ký nhưng là tùy chọn: điện thoại, website, địa chỉ chi tiết, tỉnh/xã, lĩnh vực hoạt động, ngành nghề chính, quy mô, slogan và giới thiệu. Để trống không bị xem là lỗi; trường tùy chọn không có dấu `*`. HR có thể bổ sung hoặc cập nhật chúng sau khi công ty được duyệt.
- Tỉnh/xã có thể cùng để trống; nếu nhập địa giới thì phải chọn đủ cặp hợp lệ. Địa chỉ chi tiết chỉ chứa số nhà/đường/ngõ và không ghép tên tỉnh/xã vào đó.
- Subdomain được tự đề xuất từ tên công ty trong giao diện đăng ký.
- Logo và ảnh bìa không thuộc form đăng ký; HR tiếp tục cấu hình hoặc tải lên tại Cài đặt sau khi công ty được duyệt.
- Mã số thuế và Năm thành lập là thông tin cố định: sau khi tạo hồ sơ đăng ký, HR không được thay đổi, kể cả khi hồ sơ bị từ chối; lý do từ chối không làm phát sinh quyền sửa hai trường này.
- Khi gửi lại hồ sơ bị từ chối, HR chỉ sửa các thông tin được phép. Riêng bản ghi lịch sử chưa có MST hoặc Năm thành lập thì được bổ sung giá trị còn thiếu một lần để tương thích dữ liệu cũ; sau khi lưu, giá trị đó cũng cố định.
- HR không được truy cập workspace nếu `company.status = PENDING`, `company.status = REJECTED` hoặc `user.status = INACTIVE/BLOCKED`.
- Người dùng chưa được duyệt sẽ vào Chờ duyệt Page / Rejected Page thay vì Dashboard.
- Company REJECTED không phải ngõ cụt: HR có quyền đăng nhập, xem lý do, chỉnh sửa thông tin được phép (không gồm MST và Năm thành lập đã có) và gửi lại.
- Khi HR gửi lại hồ sơ: Company Status = PENDING, User Status = PENDING và luồng duyệt được lặp lại.

### Onboarding
- Onboarding không được bắt user nhập lại dữ liệu đã biết từ bước đăng ký.
- Quyết định 21/10/2026: onboarding không hỗ trợ Skip. HR_ADMIN phải có lĩnh vực và cấu hình SMTP hợp lệ; backend tự set `onboardingCompleted` sau lưu thành công. `contactEmail` do backend lấy từ tài khoản đăng ký khi thiếu, client không được sửa; không đồng nghĩa email gửi SMTP. Các trường hồ sơ tùy chọn vẫn có thể để trống.
- Google OAuth chỉ là phương thức đăng nhập bổ sung, không thay đổi luồng duyệt của Admin.

## 6. Ngoài phạm vi và cải tiến trong tương lai
- Google OAuth chính thức trong MVP: cải tiến trong tương lai nếu chưa được phê duyệt riêng.
- Manual verification external tax code system.
- Email verification OTP không phải yêu cầu bắt buộc trong MVP.

