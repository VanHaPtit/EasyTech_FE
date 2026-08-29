# Task BE: DB Businesses

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Xác thực danh tính người dùng (Login/Register), cấp phát và quản lý JWT Token an toàn cho phiên làm việc.

## 1. Luồng xử lý (Flow)
- **Bước 1:** Nhận request từ Client thông qua Endpoint đã định nghĩa.
- **Bước 2:** Middleware chặn request để xác thực JWT Token, lấy `company_id` của tài khoản hiện tại (Multi-tenant).
- **Bước 3:** So sánh mật khẩu (Bcrypt). Khởi tạo Access Token và Refresh Token bảo mật. Trích xuất thông tin User Profile cơ bản trả về Client.
- **Bước 4:** Tương tác với cơ sở dữ liệu để thực hiện nghiệp vụ chính.
- **Bước 5:** Xử lý các tác vụ nền (Gửi Email, Kích hoạt AI Insight, Ghi Log) nếu có.
- **Bước 6:** Đóng gói kết quả dưới dạng `BaseResponse` và trả về HTTP Status phù hợp.

## 2. API & Data Contract (BaseResponse)
- **Method:** `POST`
- **Endpoint:** `/api/v1/auth/login`
- **Input (Request Payload / Params):**

    ```json
    {
      "email": "hr@easytech.com",
      "password": "***"
    }
    ```

- **Output (BaseResponse):**
    - **Thành công (`status = 1`):**

        ```json
        {
          "status": 1,
          "message": "Đăng nhập thành công",
          "data": {
            "access_token": "eyJhbGci...",
            "user": {
              "id": "uuid",
              "role": "HR"
            }
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
- **Bảng `users`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `companies`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `company_profiles`**: Truy vấn/Cập nhật dữ liệu tương ứng.
