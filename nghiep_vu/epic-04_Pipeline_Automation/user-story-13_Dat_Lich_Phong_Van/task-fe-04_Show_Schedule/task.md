# Task FE: Show Schedule

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Thực hiện xử lý nghiệp vụ chung cho Module tương ứng (CRUD).

## 1. Luồng xử lý (UI Flow)
- **Bước 1:** Người dùng điều hướng tới tính năng và tương tác trên giao diện Component.
- **Bước 2:** Render UI (kèm Skeleton Loading nếu đang fetch dữ liệu từ API).
- **Bước 3:** Kiểm tra phân quyền (RBAC), validate tham số đầu vào, tiến hành lưu hoặc trích xuất dữ liệu từ Database.
- **Bước 4:** Bắt sự kiện (Submit form, Kéo thả Kanban, Click) và Validate dữ liệu Client-side bằng Zod/React Hook Form.
- **Bước 5:** Đẩy dữ liệu qua API lên Backend thông qua Axios/TanStack Query.
- **Bước 6:** Dựa vào BaseResponse (`status=1` hoặc `status=0`), Component hiển thị Toast Message và cập nhật lại giao diện (Reset form, Refresh data list).

## 2. Component & API Integration
- **Component đảm nhiệm chính:** `Component tương ứng`
- **Quản lý Trạng thái (State/Props):** Sử dụng `React Hook Form / Local State`.
- **API Endpoints Tích hợp:** Kích hoạt request tới `GET/POST/PUT/DELETE /api/v1/module` với cấu trúc JSON tương ứng.

## 3. Dữ liệu liên quan (Data Models)
- **Bảng `secure_tokens`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `interviews`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `hiring_rounds`**: Truy vấn/Cập nhật dữ liệu tương ứng.
