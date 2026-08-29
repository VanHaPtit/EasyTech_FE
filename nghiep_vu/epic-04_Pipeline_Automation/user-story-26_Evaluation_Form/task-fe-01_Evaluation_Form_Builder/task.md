# Tên Task: Implement Evaluation Form Builder (US-26)

## 🚨 RED FLAG - YÊU CẦU NGHIỆM THU NGHIÊM NGẶT
Tương tự US-25, Dev **KHÔNG ĐƯỢC** hard-code các tiêu chí đánh giá. Phải cung cấp giao diện tạo bộ câu hỏi đánh giá linh hoạt.

## Mô tả (Mục đích)
Tạo Form/Phiếu đánh giá cho người phỏng vấn chấm điểm ứng viên tại từng vòng phỏng vấn.

## Luồng đi
- HR định nghĩa các tiêu chí (Criteria): Kỹ năng chuyên môn (1-5 điểm), Thái độ (1-5 điểm).
- Người phỏng vấn mở form lúc đang Interview và click chấm điểm, ghi chú (Note).
- Tổng hợp điểm trung bình.

## Acceptance Criteria
- Support dạng Rating scale, Text nhận xét.
- Bắt buộc phải lưu cấu trúc JSON linh hoạt vì mỗi Job/Vòng sẽ có tiêu chí khác nhau.
- Tính toán điểm tự động.
