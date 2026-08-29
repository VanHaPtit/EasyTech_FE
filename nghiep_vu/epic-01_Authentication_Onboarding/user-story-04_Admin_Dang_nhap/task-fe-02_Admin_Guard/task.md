# Task FE: Admin Guard

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Chức năng dành riêng cho Super Admin hệ thống để phê duyệt (Approve) hoặc từ chối (Reject) doanh nghiệp mới đăng ký.

## 1. Luồng xử lý (UI Flow)
- **Bước 1:** Người dùng điều hướng tới tính năng và tương tác trên giao diện Component.
- **Bước 2:** Render UI (kèm Skeleton Loading nếu đang fetch dữ liệu từ API).
- **Bước 3:** Kiểm tra Role Super Admin. Thay đổi `status` của bảng Companies. Tự động gửi email thông báo kết quả cho HR đã đăng ký.
- **Bước 4:** Bắt sự kiện (Submit form, Kéo thả Kanban, Click) và Validate dữ liệu Client-side bằng Zod/React Hook Form.
- **Bước 5:** Đẩy dữ liệu qua API lên Backend thông qua Axios/TanStack Query.
- **Bước 6:** Dựa vào BaseResponse (`status=1` hoặc `status=0`), Component hiển thị Toast Message và cập nhật lại giao diện (Reset form, Refresh data list).

## 2. Component & API Integration
- **Component đảm nhiệm chính:** `AdminDashboard.tsx / RejectionReasonModal.tsx`
- **Quản lý Trạng thái (State/Props):** Sử dụng `TanStack Table, Row Selection State`.
- **API Endpoints Tích hợp:** Kích hoạt request tới `PUT /api/v1/admin/companies/status` với cấu trúc JSON tương ứng.

## 3. Dữ liệu liên quan (Data Models)
- **Bảng `users`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `companies`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `company_profiles`**: Truy vấn/Cập nhật dữ liệu tương ứng.
