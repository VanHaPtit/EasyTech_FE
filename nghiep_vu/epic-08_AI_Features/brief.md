# EPIC 08 — AI Features

## 1. Tóm tắt
- **Nghiệp vụ:** AI hỗ trợ chấm điểm CV và gợi ý câu hỏi phỏng vấn để HR xem trước thay vì tự ra quyết định tuyển dụng.
- **Điều kiện tiên quyết:** AI provider hoặc default EasyTech AI service có sẵn, không bắt buộc HR phải cấu hình từ đầu.
- **Luồng chính:** Có Job mới hoặc ứng viên mới → AI tạo gợi ý/phân tích → HR xem lại và quyết định thủ công.

## 2. Giá trị nghiệp vụ và chỉ số
- **Giá trị nghiệp vụ:** Giảm tải công việc đọc CV thủ công, tăng tốc độ screening ban đầu.
- **Chỉ số:**
  - Thời gian screening sơ bộ giảm 60%
  - 100% AI output phải có lý do / explanation và không tự quyết định tuyển dụng

## 3. Quy trình nghiệp vụ
```mermaid
graph TD
  A[Hồ sơ ứng tuyển mới / Job] --> B[AI phân tích CV và JD]
  B --> C[Tạo điểm số + gợi ý]
  C --> D[HR xem lại và quyết định thủ công]
```

## 4. Phạm vi và Backlog
| ID | Tên Story | Ưu tiên | Trạng thái |
|---|---|---|---|
| US-34 | CV Scoring | Should Have | To-do |
| US-35 | AI Gợi ý câu hỏi | Should Have | To-do |
| US-36 | AI Match ứng viên | Should Have | To-do |

## 5. Business Rules
- AI không được tự động reject hoặc hire ứng viên.
- Mọi recommendation phải có explanation rõ ràng: điểm mạnh, điểm yếu, khoảng trống kỹ năng.
- AI Provider chốt sử dụng: ChatGPT hoặc Gemini. Chi phí API do hệ thống (Admin) chi trả trong giai đoạn MVP. Nếu provider cấu hình bị lỗi, phải fallback về default service hoặc disable chức năng mà không làm hỏng flow chính.

## 6. Cải tiến trong tương lai
- Cài đặt AI provider tùy chỉnh theo từng company
- Tự động xếp hạng và quyết định bằng agent
- Benchmark liên công ty / insight tuyển dụng


