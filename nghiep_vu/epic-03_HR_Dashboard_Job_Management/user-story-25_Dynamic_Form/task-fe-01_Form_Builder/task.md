# Tên Task: Implement Dynamic Form Builder cho Ứng Tuyển (US-25)

## 🚨 RED FLAG - YÊU CẦU NGHIỆM THU NGHIÊM NGẶT
Dev **KHÔNG ĐƯỢC** code cứng một form tĩnh. Yêu cầu bắt buộc là phải xây dựng một **Form Builder Engine**.

## Mô tả (Mục đích)
Cho phép HR tự thiết kế các trường thông tin mà ứng viên phải điền khi nộp hồ sơ vào Job này.

## Luồng đi
- Màn hình Drag & Drop (hoặc Add Field).
- Hỗ trợ các loại input: Text, Textarea, Select, Radio, Checkbox, File Upload.
- Hỗ trợ config Validation (Required, Min, Max).
- Lưu metadata dạng JSON xuống Backend.

## Acceptance Criteria
- Render form động dựa trên cấu hình JSON.
- Có tính năng Preview Form để HR xem trước khi Publish.
