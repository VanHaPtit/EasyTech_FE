# Tên Task: Xây dựng màn hình tra cứu Audit Logs

## Mô tả (Mục đích)
Trang cho phép Admin hệ thống theo dõi toàn bộ các hoạt động truy xuất (nhật ký hệ thống) để đảm bảo tính minh bạch và an ninh (VD: Ai vừa duyệt công ty, Ai đăng nhập sai nhiều lần).

## Luồng đi
- Truy cập `/admin/logs` từ Sidebar Admin.
- Hiển thị danh sách Log với các cột: Thời gian, Actor, Hành động, Đối tượng, IP, Kết quả.
- Hỗ trợ thanh Filter nâng cao (lọc theo khoảng thời gian, theo Actor email, theo kết quả Success/Failed).

## Acceptance Criteria
- Không cho phép Sửa/Xóa dữ liệu (Read-only strictly).
- Phải có phân trang.
- Bôi màu nổi bật cho các log FAILED hoặc ACTION nguy hiểm (VD: BLOCK_COMPANY, DELETE_USER).
