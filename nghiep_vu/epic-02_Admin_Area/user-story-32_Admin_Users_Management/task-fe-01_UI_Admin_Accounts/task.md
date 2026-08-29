# Tên Task: Quản lý tài khoản Quản trị viên (Admin Users)

## Mô tả (Mục đích)
Nơi Super Admin tạo tài khoản cho các System Admin khác hoặc Support team.

## Luồng đi
- Truy cập `/admin/users`.
- Xem danh sách Admin.
- Nút "Thêm tài khoản" mở modal nhập Name, Email, Role (SUPER_ADMIN, SYSTEM_MANAGER, SUPPORT).
- Gọi API tạo tài khoản (mật khẩu mặc định hoặc gửi email kích hoạt).

## Acceptance Criteria
- Cấm tự khóa (block) hoặc xóa chính tài khoản đang đăng nhập.
- Phân biệt rõ quyền SUPER_ADMIN và các Role cấp thấp hơn.
