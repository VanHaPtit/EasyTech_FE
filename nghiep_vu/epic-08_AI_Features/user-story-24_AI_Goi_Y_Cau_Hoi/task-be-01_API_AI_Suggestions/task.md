# Task BE: API AI Suggestions

## 0. Mô tả chức năng (Mục tiêu Task)
> **Mục tiêu:** Tích hợp dịch vụ AI để phân tích CV ứng viên, chấm điểm mức độ phù hợp (Matching Score) và gợi ý câu hỏi phỏng vấn.

## 1. Luồng xử lý (Flow)
- **Bước 1:** Nhận request từ Client thông qua Endpoint đã định nghĩa.
- **Bước 2:** Middleware chặn request để xác thực JWT Token, lấy `company_id` của tài khoản hiện tại (Multi-tenant).
- **Bước 3:** Giao tiếp với mô hình LLM hoặc Python AI Engine, nhận kết quả JSON. Lưu kết quả vĩnh viễn vào bảng CV_Insights.
- **Bước 4:** Tương tác với cơ sở dữ liệu để thực hiện nghiệp vụ chính.
- **Bước 5:** Xử lý các tác vụ nền (Gửi Email, Kích hoạt AI Insight, Ghi Log) nếu có.
- **Bước 6:** Đóng gói kết quả dưới dạng `BaseResponse` và trả về HTTP Status phù hợp.

## 2. API & Data Contract (BaseResponse)
- **Method:** `POST`
- **Endpoint:** `/api/v1/ai/insights`
- **Input (Request Payload / Params):**

    ```json
    {
      "application_id": "uuid",
      "resume_text": "Trích xuất văn bản từ CV..."
    }
    ```

- **Output (BaseResponse):**
    - **Thành công (`status = 1`):**

        ```json
        {
          "status": 1,
          "message": "Phân tích AI hoàn tất",
          "data": {
            "matching_score": 85,
            "strengths": [
              "React"
            ]
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
- **Bảng `cv_insights`**: Truy vấn/Cập nhật dữ liệu tương ứng.
