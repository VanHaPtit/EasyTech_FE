# 📋 User Story 16: Cấu Hình Pipeline Tuyển Dụng (Hiring Rounds Configuration)

## 1. MÔ TẢ USER STORY
- **Là** Nhà tuyển dụng (HR),
- **Tôi muốn** tùy chỉnh các vòng tuyển dụng (Hiring Rounds) riêng cho từng tin tuyển dụng,
- **Để** tôi có thể thiết kế quy trình phỏng vấn linh hoạt phù hợp với đặc thù từng vị trí (ví dụ: vị trí kỹ thuật cần thêm vòng Technical Test, vị trí senior cần thêm vòng Culture Fit).
- **Story Points:** 5

### Contract đang áp dụng
- Bảng triển khai là `hiring_rounds`; khóa `id`, `job_id` và `company_id` dùng `BIGINT` ở database, tương ứng `Long` trong backend và `number` ở frontend.
- Round đang hiệu lực được xác định bởi `is_deleted = false`; thao tác xóa là xóa mềm và không làm mất dữ liệu lịch sử ứng viên.
- Schema hiện tại không có field `type` hoặc `is_required` cho `hiring_rounds`. Contract sử dụng các field đã có trong code/database: `name`, `description`, `passEmailTemplateId`, `failEmailTemplateId`, `testLink` và `isFinalRound`.
- `jobs.round_count` luôn được đồng bộ với số round có `is_deleted = false`. Job không cần phỏng vấn được phép có pipeline rỗng và `roundCount = 0`.
- Job `CLOSED` chỉ được xem; không được tạo, sửa, xóa hoặc sắp xếp round.
- Mọi endpoint của US-16 đều re-check user thuộc đúng `company_id`, có role `HR`/`HR_ADMIN`, user và company đang `ACTIVE`; token hoặc frontend không được xem là nguồn xác thực cuối cùng.
- Các thao tác tạo, sửa, xóa mềm và sắp xếp round ghi audit log theo actor hiện tại. Đọc danh sách không tạo side effect.
- `passEmailTemplateId` và `failEmailTemplateId` là `Long` nullable; nếu truyền thì phải là số dương. US-16 chỉ lưu liên kết ID theo schema hiện tại; kiểm tra tồn tại và tenant của email template sẽ thuộc US-29. Không dùng ID hoặc tên template mock trên UI khi US-29 chưa có API/database triển khai.
- Luồng chỉnh sửa tổng hợp hiện có của US-13 (`PUT /api/v1/jobs/{jobId}/pipeline`) vẫn được giữ để lưu Job + toàn bộ pipeline trong một transaction; endpoint này phải áp dụng cùng rule của US-16 về `CLOSED`, tenant, workspace ACTIVE, `roundCount` và audit.
- Nếu request aggregate có truyền `job.roundCount`, giá trị đó phải bằng số phần tử `rounds`; backend vẫn tính lại và lưu `jobs.round_count` từ danh sách round thực tế. Danh sách rỗng và `roundCount = 0` là hợp lệ.

## SƠ ĐỒ LUỒNG NGHIỆP VỤ (Business Flow)

```mermaid
graph TD
    A[Vào mục cấu hình Job] --> B[Mở tab Hiring Pipeline]
    B --> C[Xem các Round hiện tại]
    C --> D{Thao tác}
    D -- Thêm Round --> E[Tạo mới DB]
    D -- Kéo thả (Drag&Drop) --> F[Gửi API Reorder]
    D -- Sửa/Xóa --> G[Cập nhật DB]
    F --> H[Cập nhật UI]
```

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: HR thêm vòng tuyển dụng cho Job**
- **VỚI ĐIỀU KIỆN** HR đang ở màn hình cấu hình vòng của Job (`/dashboard/jobs/{jobId}/rounds`), thuộc company hiện tại.
- **KHI** HR nhấn nút "Thêm vòng" và điền tên, mô tả tùy chọn, email template khi đạt/trượt, link bài test nếu có và đánh dấu vòng cuối nếu cần.
- **THÌ** hệ thống lưu vòng mới vào bảng `hiring_rounds` với `job_id` tương ứng và `order_index` tự động gán cuối danh sách.
- `jobs.round_count` được tăng theo số round đang hiệu lực. Danh sách vòng hiện tại cập nhật và hiển thị đủ thông tin vòng vừa tạo.

- **Kịch bản 2: HR sắp xếp lại thứ tự vòng bằng Drag & Drop**
  - **VỚI ĐIỀU KIỆN** HR đã có ít nhất 2 vòng tuyển dụng trong danh sách.
  - **KHI** HR kéo-thả để thay đổi vị trí của một vòng.
- **THÌ** hệ thống gọi API `PUT /api/v1/jobs/{jobId}/rounds/reorder` với payload `{ "orderedIds": [201, 202, ...] }`.
- `orderedIds` phải chứa đầy đủ mỗi `Long` ID của round đang hiệu lực đúng một lần; không được chứa ID của Job khác, ID không tồn tại hoặc ID round đã xóa mềm.
  - Kanban Board tự động cập nhật thứ tự cột tương ứng.

- **Kịch bản 3: HR chỉnh sửa thông tin một vòng tuyển dụng**
  - **VỚI ĐIỀU KIỆN** HR muốn thay đổi tên vòng hoặc email template gắn với vòng.
  - **KHI** HR nhấn icon "Sửa" trên vòng tương ứng và lưu.
  - **THÌ** hệ thống cập nhật bản ghi `hiring_rounds` và mọi đơn ứng tuyển đang ở vòng đó giữ nguyên trạng thái.

- **Kịch bản 4: HR xóa một vòng tuyển dụng**
  - **VỚI ĐIỀU KIỆN** một vòng tuyển dụng đang tồn tại trong Job.
  - **KHI** HR nhấn nút "Xóa" trên vòng đó.
- **THÌ** nếu vòng **chưa có ứng viên đang ở vòng đó**: hệ thống xóa mềm, cập nhật lại `order_index` của các vòng còn lại và đồng bộ `jobs.round_count`.
- Nếu vòng **đang có ứng viên ở `current_round_id`**: hệ thống trả lỗi để UI hiển thị cảnh báo: _"Vòng này đang có ứng viên. Bạn cần chuyển họ sang vòng khác trước khi xóa."_ và không thực hiện xóa.

- Nếu request truy cập Job thuộc company khác hoặc Job đã bị xóa mềm: trả `404` theo tenant boundary, không tiết lộ tài nguyên của company khác.

- **Kịch bản 5: Job được publish mà không có vòng nào**
  - **VỚI ĐIỀU KIỆN** HR tạo Job nhưng chưa cấu hình vòng tuyển dụng.
  - **KHI** HR nhấn "Publish".
- **THÌ** Job vẫn giữ `roundCount = 0`; luồng publish xử lý cảnh báo và cấu hình tối giản theo contract của US-14/US-22. US-16 không tự tạo round mặc định khi danh sách rỗng.

## 3. NGOÀI PHẠM VI
- **KHÔNG** hỗ trợ chia sẻ template pipeline giữa các Job trong phiên bản này (copy pipeline từ job khác).
- **KHÔNG** giới hạn số lượng vòng tối đa (HR có thể tạo bao nhiêu vòng tùy ý).
- **KHÔNG** hỗ trợ vòng song song (parallel rounds) – tất cả vòng là tuần tự.
