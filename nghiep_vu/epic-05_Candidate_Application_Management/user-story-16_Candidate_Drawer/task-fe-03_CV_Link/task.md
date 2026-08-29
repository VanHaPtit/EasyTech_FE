# Task FE: CV Link

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Thao tác với dữ liệu Ứng viên (Candidates) và Đơn ứng tuyển (Applications), bao gồm việc upload CV và hiển thị danh sách hồ sơ.

## 1. Luồng xử lý (UI Flow)
- **Bước 1:** Người dùng điều hướng tới tính năng và tương tác trên giao diện Component.
- **Bước 2:** Render UI (kèm Skeleton Loading nếu đang fetch dữ liệu từ API).
- **Bước 3:** Xử lý file upload lên Cloud Storage để lưu trữ CV. Cập nhật thông tin ứng viên và gắn vào Pipeline của Job tương ứng.
- **Bước 4:** Bắt sự kiện (Submit form, Kéo thả Kanban, Click) và Validate dữ liệu Client-side bằng Zod/React Hook Form.
- **Bước 5:** Đẩy dữ liệu qua API lên Backend thông qua Axios/TanStack Query.
- **Bước 6:** Dựa vào BaseResponse (`status=1` hoặc `status=0`), Component hiển thị Toast Message và cập nhật lại giao diện (Reset form, Refresh data list).

## 2. Component & API Integration
- **Component đảm nhiệm chính:** `CandidateDrawer.tsx / CandidatesList.tsx`
- **Quản lý Trạng thái (State/Props):** Sử dụng `Zod Form Validation, TanStack Query`.
- **API Endpoints Tích hợp:** Kích hoạt request tới `POST/GET /api/v1/candidates` với cấu trúc JSON tương ứng.

## 3. Dữ liệu liên quan (Data Models)
- **Bảng `applications`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `candidates`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `secure_tokens`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `interviews`**: Truy vấn/Cập nhật dữ liệu tương ứng.
