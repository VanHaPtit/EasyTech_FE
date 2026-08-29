# Task BE: Confirm Email

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Thao tác với dữ liệu Ứng viên (Candidates) và Đơn ứng tuyển (Applications), bao gồm việc upload CV và hiển thị danh sách hồ sơ.

## 1. Luồng xử lý (Flow)
- **Bước 1:** Nhận request từ Client thông qua Endpoint đã định nghĩa.
- **Bước 2:** Middleware chặn request để xác thực JWT Token, lấy `company_id` của tài khoản hiện tại (Multi-tenant).
- **Bước 3:** Xử lý file upload lên Cloud Storage để lưu trữ CV. Cập nhật thông tin ứng viên và gắn vào Pipeline của Job tương ứng.
- **Bước 4:** Tương tác với cơ sở dữ liệu để thực hiện nghiệp vụ chính.
- **Bước 5:** Xử lý các tác vụ nền (Gửi Email, Kích hoạt AI Insight, Ghi Log) nếu có.
- **Bước 6:** Đóng gói kết quả dưới dạng `BaseResponse` và trả về HTTP Status phù hợp.

## 2. API & Data Contract (BaseResponse)
- **Method:** `POST/GET`
- **Endpoint:** `/api/v1/candidates`
- **Input (Request Payload / Params):**

    ```json
    {
      "job_id": "uuid",
      "full_name": "Nguyễn Văn A",
      "email": "a@gmail.com",
      "phone": "0987654321",
      "resume_url": "https://s3/cv.pdf"
    }
    ```

- **Output (BaseResponse):**
    - **Thành công (`status = 1`):**

        ```json
    {
      "status": 1,
      "message": "Nộp hồ sơ thành công",
      "data": {
        "candidate_id": "uuid"
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
- **Bảng `applications`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `ai_suggestions`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `email_templates`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `cv_insights`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `candidates`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `email_logs`**: Truy vấn/Cập nhật dữ liệu tương ứng.
