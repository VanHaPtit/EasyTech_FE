# Task BE: API Create Interview

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Lên lịch phỏng vấn cho ứng viên, tạo đường dẫn phòng họp online (Google Meet) và gửi email thông báo tự động.

## 1. Luồng xử lý (Flow)
- **Bước 1:** Nhận request từ Client thông qua Endpoint đã định nghĩa.
- **Bước 2:** Middleware chặn request để xác thực JWT Token, lấy `company_id` của tài khoản hiện tại (Multi-tenant).
- **Bước 3:** Kiểm tra tính hợp lệ của thời gian phỏng vấn. Ghi nhận dữ liệu vào bảng Interviews và Trigger hệ thống gửi Email/Magic Link.
- **Bước 4:** Tương tác với cơ sở dữ liệu để thực hiện nghiệp vụ chính.
- **Bước 5:** Xử lý các tác vụ nền (Gửi Email, Kích hoạt AI Insight, Ghi Log) nếu có.
- **Bước 6:** Đóng gói kết quả dưới dạng `BaseResponse` và trả về HTTP Status phù hợp.

## 2. API & Data Contract (BaseResponse)
- **Method:** `POST`
- **Endpoint:** `/api/v1/interviews`
- **Input (Request Payload / Params):**

    ```json
    {
      "application_id": "uuid",
      "interview_time": "2026-09-10T14:30:00Z",
      "interviewer_emails": [
        "hr@company.com"
      ]
    }
    ```

- **Output (BaseResponse):**
    - **Thành công (`status = 1`):**

        ```json
        {
          "status": 1,
          "message": "Lên lịch thành công",
          "data": {
            "interview_id": "uuid"
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
- **Bảng `secure_tokens`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `interviews`**: Truy vấn/Cập nhật dữ liệu tương ứng.
- **Bảng `hiring_rounds`**: Truy vấn/Cập nhật dữ liệu tương ứng.
