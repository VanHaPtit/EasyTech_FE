# T-INF-16: AWS S3 Storage Setup

## 1. Mục tiêu
Thiết lập hạ tầng lưu trữ đám mây cho các file của hệ thống (chủ yếu là CV, Portfolio ứng viên) thay vì lưu trữ tại ổ cứng server local. Quyết định chốt sử dụng **AWS S3**.

## 2. Yêu cầu kỹ thuật (Backend)
- Tích hợp `AWS SDK for Java` (v2) vào Spring Boot.
- Cấu hình các biến môi trường trong `.env` và `application.yml` cho:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`
  - `AWS_S3_BUCKET_NAME`
- Xây dựng `StorageService` (interface) và `AwsS3StorageServiceImpl` để handle upload, download, và delete file.
- Trả về pre-signed URL hoặc public URL (nếu bucket public-read cho một số tài nguyên) cho Frontend. Tuy nhiên, CV ứng viên là tài liệu nhạy cảm, nên sử dụng **Pre-signed URL** để cấp quyền truy cập tạm thời cho HR xem.

## 3. Yêu cầu giao diện (Frontend)
- FE không gọi trực tiếp AWS S3 từ trình duyệt để tránh lộ Credentials, trừ trường hợp BE cấp Pre-signed URL cho thao tác PUT trực tiếp (thường MVP gửi file qua BE dưới dạng Multipart Form Data là đủ đơn giản).
- Hiển thị UI upload file có validate dung lượng (ví dụ max 5MB) và định dạng (`.pdf`, `.doc`, `.docx`).

## 4. Bảo mật và Chi phí
- Cấu hình IAM Role chỉ có quyền trên bucket dự án.
- Không để bucket public (ngăn chặn rò rỉ hồ sơ ứng viên).
- Tracking dung lượng lưu trữ để dự báo chi phí.
