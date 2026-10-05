# EPIC 08 — AI Features

## 1. Tóm tắt
- **Nghiệp vụ:** AI hỗ trợ chấm điểm CV và gợi ý ứng viên phù hợp để HR xem xét; HR luôn là người quyết định tuyển dụng.
- **Điều kiện tiên quyết:** AI provider hoặc default EasyTech AI service có sẵn, không bắt buộc HR phải cấu hình từ đầu.
- **Luồng chính:** US-34 chạy khi HR chủ động yêu cầu chấm điểm CV; US-36 chạy khi Job được publish hoặc HR chủ động chạy lại AI Match → HR xem kết quả và quyết định thủ công.

## 2. Giá trị nghiệp vụ và chỉ số
- **Giá trị nghiệp vụ:** Giảm tải công việc đọc CV thủ công, tăng tốc độ screening ban đầu.
- **Chỉ số:**
  - Thời gian screening sơ bộ giảm 60%
  - 100% AI output phải có lý do / explanation và không tự quyết định tuyển dụng

## 3. Quy trình nghiệp vụ
```mermaid
graph TD
  A[HR chọn Job ACTIVE] --> B[Mở danh sách Application]
  B --> C[Mở Candidate Drawer và xem CV PDF]
  C --> D[Nhấn nút "Chấm điểm AI"]
  D --> E[AI phân tích CV và JD (On-demand)]
  E --> F[Tạo điểm số + explanation]
  F --> G[HR xem kết quả và quyết định thủ công]
```

## 4. Phạm vi và Backlog
| ID | Tên Story | Ưu tiên | Trạng thái |
|---|---|---|---|
| US-34 | CV Scoring | Should Have | Đang triển khai — BE/UI MVP, chờ E2E provider |
| US-35 | AI Gợi ý câu hỏi | — | Ngừng sử dụng — nhóm thống nhất ngày 2026-10-01 |
| US-36 | AI Match ứng viên | Should Have | To-do |

> **Ghi chú US-35:** Nhóm đã thống nhất không sử dụng tính năng AI gợi ý câu hỏi phỏng vấn. Không triển khai API, UI hoặc thay đổi schema cho story này; nội dung story và task được giữ lại để tra cứu quyết định.

## 5. Business Rules
- AI không được tự động reject hoặc hire ứng viên.
- Mọi recommendation phải có explanation rõ ràng: điểm mạnh, điểm yếu, khoảng trống kỹ năng.
- AI Provider chốt sử dụng: ChatGPT hoặc Gemini. Chi phí API do hệ thống (Admin) chi trả trong giai đoạn MVP.
- Provider resolution thống nhất: custom provider `ACTIVE` và key hợp lệ của company → system default → lỗi rõ ràng nếu không có provider khả dụng; không dùng mock response.
- CV scoring lưu kết quả vào `cv_analyses` và chạy on-demand, đồng bộ; `POST /api/v1/applications/{applicationId}/cv-analysis` chỉ trả `200` sau khi lưu xong, không dùng `202`/worker trong MVP.

### Trạng thái triển khai MVP
- US-12 đã có backend proxy Gemini cho `POST /api/v1/ai/job-description/suggest` và panel preview trên UI; kết quả stateless, HR phải chủ động áp dụng, không tự ghi đè Job.
- US-34 đã có backend PDF text extraction, Gemini scoring đồng bộ, lưu lịch sử vào `cv_analyses` và Candidate Drawer với nút chạy on-demand.
- Runtime nhận system key từ biến môi trường `GEMINI_API_KEY`; không seed hoặc commit API key vào repository. E2E với Gemini thật chỉ được xác nhận sau khi cấu hình key mới đã rotate và chạy trên PostgreSQL/Docker.
- CRUD/UI cấu hình custom provider của US-31 chưa nằm trong phạm vi tích hợp MVP này; resolver đã giữ đúng thứ tự custom active → system default → lỗi.

### AI Scoring Trigger — MVP Decision
- **On-demand:** HR phải chủ động nhấn nút "Chấm điểm AI" trong Candidate Drawer — AI KHÔNG tự động chạy khi Candidate nộp CV.
- **Lý do:** Tránh tăng chi phí API không kiểm soát; đảm bảo HR chủ động khi dùng AI.
- **Auto-trigger là Future Enhancement** (sau MVP khi hệ thống có rate limiting và cost control đầy đủ).

## 6. Cải tiến trong tương lai
- Cài đặt AI provider tùy chỉnh theo từng company
- Tự động xếp hạng và quyết định bằng agent
- Benchmark liên công ty / insight tuyển dụng


