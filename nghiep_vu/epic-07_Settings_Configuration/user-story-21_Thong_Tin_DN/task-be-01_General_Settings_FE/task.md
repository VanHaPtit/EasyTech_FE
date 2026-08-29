# Task BE: General Settings FE

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Quản lý (Tạo/Sửa/Xóa/Xem) các bản ghi Tin tuyển dụng (Jobs) của doanh nghiệp trên hệ thống tuyển dụng.

## 1. Luồng xử lý (Flow)
- **Bước 1:** Nhận request từ Client thông qua Endpoint đã định nghĩa.
- **Bước 2:** Middleware chặn request để xác thực JWT Token, lấy `company_id` của tài khoản hiện tại (Multi-tenant).
- **Bước 3:** Validate các trường dữ liệu bắt buộc (title, description, salary). Đảm bảo công việc thuộc quyền sở hữu của company_id tương ứng.
- **Bước 4:** Tương tác với cơ sở dữ liệu để thực hiện nghiệp vụ chính.
- **Bước 5:** Xử lý các tác vụ nền (Gửi Email, Kích hoạt AI Insight, Ghi Log) nếu có.
- **Bước 6:** Đóng gói kết quả dưới dạng `BaseResponse` và trả về HTTP Status phù hợp.

## 2. API & Data Contract (BaseResponse)
- **Method:** `POST/PUT/GET`
- **Endpoint:** `/api/v1/jobs`
- **Input (Request Payload / Params):**

    ```json
    {
      "title": "Senior React Developer",
      "description": "...",
      "salary_min": 1000,
      "salary_max": 2500,
      "location": "Hà Nội",
      "job_type": "FULL_TIME",
      "status": "DRAFT"
    }
    ```

- **Output (BaseResponse):**
    - **Thành công (`status = 1`):**

        ```json
    {
      "status": 1,
      "message": "Thành công",
      "data": {
        "job_id": "uuid"
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
- **Bảng `company_id`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `is_deleted`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `jobs`**: Truy vấn/Cập nhật dữ liệu tương ứng.
