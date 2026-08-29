# Tên Task: Thiết kế và tích hợp UI Quản lý Danh Mục Job

## Mô tả (Mục đích)
Xây dựng giao diện cho Admin để thêm, sửa, khóa/xóa các danh mục công việc (Job Categories). Các danh mục này sẽ được dùng chung cho toàn hệ thống khi HR tạo Job mới.

## Luồng đi
- Truy cập vào `/admin/categories` từ Sidebar Admin.
- Xem danh sách categories (Tên, Slug, Số lượng tin đang dùng, Trạng thái).
- Click "Thêm danh mục" -> Mở Modal nhập liệu.
- Validate và gọi API tạo mới. Tương tự cho sửa/khóa.

## Acceptance Criteria
- Phân trang hoặc tải lướt danh sách.
- Không cho xóa nếu `jobsCount` > 0 (Chỉ cho chuyển trạng thái Inactive).
- Đảm bảo Slug tự động sinh ra từ Tên danh mục.
