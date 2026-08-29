# Task FE: PrivateRoute

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Xác thực danh tính người dùng (Login/Register), cấp phát và quản lý JWT Token an toàn cho phiên làm việc.

## 1. Luồng xử lý (UI Flow)
- **Bước 1:** Người dùng điều hướng tới tính năng và tương tác trên giao diện Component.
- **Bước 2:** Render UI (kèm Skeleton Loading nếu đang fetch dữ liệu từ API).
- **Bước 3:** So sánh mật khẩu (Bcrypt). Khởi tạo Access Token và Refresh Token bảo mật. Trích xuất thông tin User Profile cơ bản trả về Client.
- **Bước 4:** Bắt sự kiện (Submit form, Kéo thả Kanban, Click) và Validate dữ liệu Client-side bằng Zod/React Hook Form.
- **Bước 5:** Đẩy dữ liệu qua API lên Backend thông qua Axios/TanStack Query.
- **Bước 6:** Dựa vào BaseResponse (`status=1` hoặc `status=0`), Component hiển thị Toast Message và cập nhật lại giao diện (Reset form, Refresh data list).

## 2. Component & API Integration
- **Component đảm nhiệm chính:** `LoginPage.tsx / AdminLogin.tsx`
- **Quản lý Trạng thái (State/Props):** Sử dụng `AuthContext (Context API) / Redux`.
- **API Endpoints Tích hợp:** Kích hoạt request tới `POST /api/v1/auth/login` với cấu trúc JSON tương ứng.

## 3. Dữ liệu liên quan (Data Models)
- **Bảng `users`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `companies`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `company_profiles`**: Truy vấn/Cập nhật dữ liệu tương ứng.
