# Task FE: Đăng ký Form

## Mục đích
Xây dựng screen/component phục vụ US-02 - HR đăng ký, tập trung vào hành vi người dùng và trạng thái UI.

## Screen/Component
- Component chính: $title.
- Hiển thị trong đúng route/layout của epic hiện tại.
- Dữ liệu phải tôn trọng multi-tenant và role hiện tại.

## Hành động của user
- Người dùng mở màn hình và hoàn thành form đăng ký gồm 2 bước:
  - Bước 1: Nhập thông tin tài khoản HR (Họ tên, Email, Mật khẩu).
  - Bước 2: Nhập thông tin doanh nghiệp (Tên công ty, MST, Số điện thoại, Địa chỉ, Subdomain).

## Hành vi UI
- Hiển thị Form theo luồng 2 bước (Stepper/Wizard).
- Vô hiệu hóa nút "Tiếp tục" hoặc "Đăng ký" nếu form validation chưa vượt qua, hiển thị inline error màu đỏ.
- Vô hiệu hóa nút submit trong lúc request đang chạy để tránh gửi lặp.
- Tự động gợi ý Subdomain từ Tên công ty khi người dùng nhập xong tên công ty.

## Validation
- Validate trường bắt buộc ngay trên FE để cải thiện UX.
- Không coi FE validation là source-of-truth; BE vẫn phải validate lại.
- Hiển thị lỗi gần trường nhập liệu và không xóa dữ liệu user đã nhập khi validation không đạt.

## Phản hồi thành công
- Hiển thị toast hoặc trạng thái xác nhận sau khi hành động thành công.
- Điều hướng theo flow cụ thể của user story.

## Xử lý lỗi
- Hiển thị lỗi có thể hành động được: điều gì sai và user cần sửa gì.
- Nếu lỗi authz: Company = PENDING + User = PENDING redirect /pending; Company = REJECTED + User = PENDING redirect /registration/rejected; User = INACTIVE/BLOCKED thì từ chối truy cập.

## API dependency cụ thể
- `POST /api/v1/auth/login`, `POST /api/v1/auth/register`, `GET /api/v1/auth/me`, `POST /api/v1/auth/refresh` tùy màn hình.
