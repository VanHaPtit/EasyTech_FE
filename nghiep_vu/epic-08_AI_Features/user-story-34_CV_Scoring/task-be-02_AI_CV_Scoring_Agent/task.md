# Task BE Service: AI CV Scoring Agent

## Mục đích
Xử lý logic backend nội bộ phục vụ US-23 - CV Scoring. Task này không cung cấp HTTP endpoint riêng.

## Đầu vào
- Entity hoặc DTO đã được validate từ API/service gọi vào.
- Context tenant gồm company_id, user_id, role và trạng thái truy cập nếu có.
- Cấu hình hệ thống cần thiết như SMTP, AI provider, template hoặc storage.

## Xử lý
- AI chỉ tạo recommendation; HR giữ quyền quyết định cuối cùng.
- AI chỉ tạo recommendation; HR giữ quyền quyết định cuối cùng.
- Thực hiện nghiệp vụ chính theo domain hiện tại, không tự thêm feature ngoài phạm vi story.
- Kiểm tra quyền theo workspace authorization, không trộn với authentication.

## Kết quả đầu ra
- Kết quả xử lý dạng object/service result để API layer đóng gói BaseResponse.
- Thông tin lỗi rõ nguyên nhân và hành động user/admin cần làm tiếp.

## Phụ thuộc
- Repository/database liên quan.
- Email/AI/storage/provider config nếu task cần tích hợp ngoài.
- Audit/logging service khi có thay đổi dữ liệu hoặc side effect quan trọng.

## Side Effects
- Gửi email, ghi audit log, lưu file, lưu AI result hoặc dispatch notification nếu nghiệp vụ yêu cầu.
- Không gửi lặp khi retry nếu action đã thành công trước đó.

## Xử lý lỗi
- Log lỗi đủ context nhưng không log secret/token/API key.
- Retry có kiểm soát cho lỗi tạm thời như SMTP/AI provider.
- Trả lỗi nghiệp vụ có thể hiểu được cho API layer.
