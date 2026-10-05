# task-be-02_AI_cham_diem_cv

## Mục đích
Xác định phạm vi backend cho task 'AI cham diem cv' trong US-34 CV Scoring, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Đầu vào
- Entity hoặc DTO đã được validate từ API/service gọi vào.
- Context tenant gồm company_id, user_id, role và trạng thái truy cập nếu có.
- Cấu hình hệ thống cần thiết như SMTP, AI provider, template hoặc storage.

## Xử lý
- AI chỉ tạo recommendation; HR giữ quyền quyết định cuối cùng.
- Task chỉ chạy khi HR chủ động gọi API chấm điểm; không tự chạy khi Application được tạo.
- Xử lý đồng bộ và chỉ hoàn tất sau khi lưu kết quả vào `cv_analyses`; không dùng queue/worker hoặc `202` trong MVP.
- Resolve provider theo thứ tự custom provider `ACTIVE` của company, system default, sau đó trả lỗi nếu không có provider khả dụng.
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
- Lưu AI result vào `cv_analyses`; không tự đổi Application Status hoặc Round Result.
- Có thể ghi audit/usage metadata nhưng không log secret/token/API key.
- Không gửi lặp khi retry nếu action đã thành công trước đó.

## Xử lý lỗi
- Log lỗi đủ context nhưng không log secret/token/API key.
- Với AI provider, retry có giới hạn cho lỗi tạm thời (`408`, `429`, `5xx`, lỗi kết nối), mặc định tối đa 2 lần thử cho mỗi model và có backoff/jitter giới hạn.
- Sau khi model chính hết lượt mà chưa thành công, chuyển sang `GEMINI_FALLBACK_MODEL` và áp dụng cùng chính sách retry. Không retry lỗi API key/quyền hoặc request/schema không hợp lệ.
- Nếu model chính và model dự phòng đều thất bại, trả `503` với thông báo nêu rõ cả hai model và số lượt thử; lưu `FAILED`, không tạo điểm giả và không xóa kết quả `COMPLETED` trước đó.
- Trả lỗi nghiệp vụ có thể hiểu được cho API layer.
