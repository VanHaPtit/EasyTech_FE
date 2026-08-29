# Task BE: Audit Log BE

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Chức năng dành riêng cho Super Admin hệ thống để phê duyệt (Approve) hoặc từ chối (Reject) doanh nghiệp mới đăng ký.

## 1. Luồng xử lý (Flow)
- **Bước 1:** Nhận request từ Client thông qua Endpoint đã định nghĩa.
- **Bước 2:** Middleware chặn request để xác thực JWT Token, lấy `company_id` của tài khoản hiện tại (Multi-tenant).
- **Bước 3:** Kiểm tra Role Super Admin. Thay đổi `status` của bảng Companies. Tự động gửi email thông báo kết quả cho HR đã đăng ký.
- **Bước 4:** Tương tác với cơ sở dữ liệu để thực hiện nghiệp vụ chính.
- **Bước 5:** Xử lý các tác vụ nền (Gửi Email, Kích hoạt AI Insight, Ghi Log) nếu có.
- **Bước 6:** Đóng gói kết quả dưới dạng `BaseResponse` và trả về HTTP Status phù hợp.

## 2. API & Data Contract (BaseResponse)
- **Method:** `PUT`
- **Endpoint:** `/api/v1/admin/companies/status`
- **Input (Request Payload / Params):**

    ```json
    {
      "company_id": "uuid",
      "status": "REJECTED",
      "rejection_reason": "Thiếu thông tin giấy phép"
    }
    ```

- **Output (BaseResponse):**
    - **Thành công (`status = 1`):**

        ```json
        {
          "status": 1,
          "message": "Cập nhật thành công",
          "data": {
            "company_id": "uuid"
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
