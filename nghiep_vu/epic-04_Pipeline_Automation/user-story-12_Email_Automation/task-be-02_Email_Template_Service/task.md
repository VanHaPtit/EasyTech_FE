# Task BE: Email Template Service

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Quản lý các Mẫu email (Email Templates) của doanh nghiệp dùng để tự động hóa liên lạc với ứng viên.

## 1. Luồng xử lý (Flow)
- **Bước 1:** Nhận request từ Client thông qua Endpoint đã định nghĩa.
- **Bước 2:** Middleware chặn request để xác thực JWT Token, lấy `company_id` của tài khoản hiện tại (Multi-tenant).
- **Bước 3:** Parse và validate cấu trúc HTML của template. Đảm bảo hỗ trợ chính xác các biến nội suy (variables) như {{candidate_name}}, {{job_title}}.
- **Bước 4:** Tương tác với cơ sở dữ liệu để thực hiện nghiệp vụ chính.
- **Bước 5:** Xử lý các tác vụ nền (Gửi Email, Kích hoạt AI Insight, Ghi Log) nếu có.
- **Bước 6:** Đóng gói kết quả dưới dạng `BaseResponse` và trả về HTTP Status phù hợp.

## 2. API & Data Contract (BaseResponse)
- **Method:** `POST/PUT/GET`
- **Endpoint:** `/api/v1/email-templates`
- **Input (Request Payload / Params):**

    ```json
    {
      "template_name": "Thư Mời",
      "subject": "Phỏng vấn - {{job_title}}",
      "body_html": "<p>Chào {{candidate_name}}...</p>"
    }
    ```

- **Output (BaseResponse):**
    - **Thành công (`status = 1`):**

        ```json
    {
      "status": 1,
      "message": "Lưu template thành công",
      "data": {
        "template_id": "uuid"
      }
    }
        ```

    - **Thất bại (`status = 0`):**

        ```json
    {
      "status": 0,
      "message": "Lỗi (VD: Không tìm thấy bản ghi, Dữ liệu không hợp lệ)",
      "data": null
    }
        ```

## 3. Cơ sở dữ liệu liên quan (DB Tables)
- **Bảng `ai_suggestions`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `email_templates`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `cv_insights`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `hiring_rounds`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `email_logs`**: Truy vấn/Cập nhật dữ liệu tương ứng.
