# Tên Task: Tích hợp Gợi ý Ứng viên (AI Match)

## Mô tả (Mục đích)
Khi HR tạo một Job mới, hệ thống (bảng `ai_suggestions`) sẽ quét trong DB ứng viên cũ và đề xuất ngay những người có profile khớp với Job mới để HR liên hệ.

## Luồng đi
- Trong màn hình Chi tiết Job (hoặc Pipeline), có tab "AI Suggestions".
- Hiển thị danh sách ứng viên được gợi ý kèm % Match Score.
- Nút "Mời ứng tuyển" để gửi email cho ứng viên đó.

## Acceptance Criteria
- Cần giải thích rõ lý do match (VD: "Có 3 năm KN React").
- Gửi email mời ứng tuyển hàng loạt (Bulk actions).
