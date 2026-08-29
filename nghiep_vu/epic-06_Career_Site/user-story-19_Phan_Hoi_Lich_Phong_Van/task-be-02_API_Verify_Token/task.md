# Task BE: API Verify Token

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Thực hiện xử lý nghiệp vụ chung cho Module tương ứng (CRUD).

## 1. Luồng xử lý (Flow)
- **Bước 1:** Nhận request từ Client thông qua Endpoint đã định nghĩa.
- **Bước 2:** Middleware chặn request để xác thực JWT Token, lấy `company_id` của tài khoản hiện tại (Multi-tenant).
- **Bước 3:** Kiểm tra phân quyền (RBAC), validate tham số đầu vào, tiến hành lưu hoặc trích xuất dữ liệu từ Database.
- **Bước 4:** Tương tác với cơ sở dữ liệu để thực hiện nghiệp vụ chính.
- **Bước 5:** Xử lý các tác vụ nền (Gửi Email, Kích hoạt AI Insight, Ghi Log) nếu có.
- **Bước 6:** Đóng gói kết quả dưới dạng `BaseResponse` và trả về HTTP Status phù hợp.

## 2. API & Data Contract (BaseResponse)
- **Method:** `GET/POST/PUT/DELETE`
- **Endpoint:** `/api/v1/module`
- **Input (Request Payload / Params):**

    ```json
    {
      "id": "uuid"
    }
    ```

- **Output (BaseResponse):**
    - **Thành công (`status = 1`):**

        ```json
        {
          "status": 1,
          "message": "Thành công",
          "data": {
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
