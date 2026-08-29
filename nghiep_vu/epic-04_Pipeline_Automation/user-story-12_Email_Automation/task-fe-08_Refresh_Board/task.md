# Task FE: Refresh Board

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Quản lý các Mẫu email (Email Templates) của doanh nghiệp dùng để tự động hóa liên lạc với ứng viên.

## 1. Luồng xử lý (UI Flow)
- **Bước 1:** Người dùng điều hướng tới tính năng và tương tác trên giao diện Component.
- **Bước 2:** Render UI (kèm Skeleton Loading nếu đang fetch dữ liệu từ API).
- **Bước 3:** Parse và validate cấu trúc HTML của template. Đảm bảo hỗ trợ chính xác các biến nội suy (variables) như {{candidate_name}}, {{job_title}}.
- **Bước 4:** Bắt sự kiện (Submit form, Kéo thả Kanban, Click) và Validate dữ liệu Client-side bằng Zod/React Hook Form.
- **Bước 5:** Đẩy dữ liệu qua API lên Backend thông qua Axios/TanStack Query.
- **Bước 6:** Dựa vào BaseResponse (`status=1` hoặc `status=0`), Component hiển thị Toast Message và cập nhật lại giao diện (Reset form, Refresh data list).

## 2. Component & API Integration
- **Component đảm nhiệm chính:** `AIEmailPreviewModal.tsx / Settings.tsx`
- **Quản lý Trạng thái (State/Props):** Sử dụng `Rich Text Editor (Quill/TinyMCE), useForm`.
- **API Endpoints Tích hợp:** Kích hoạt request tới `POST/PUT/GET /api/v1/email-templates` với cấu trúc JSON tương ứng.

## 3. Dữ liệu liên quan (Data Models)
- **Bảng `ai_suggestions`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `email_templates`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `cv_insights`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `hiring_rounds`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `email_logs`**: Truy vấn/Cập nhật dữ liệu tương ứng.
