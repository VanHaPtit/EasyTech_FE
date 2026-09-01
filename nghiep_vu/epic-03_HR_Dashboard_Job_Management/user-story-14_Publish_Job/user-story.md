# 📋 User Story 14: Publish / Close / Reopen Job

## 1. MÔ TẢ USER STORY
- **Là** Nhà tuyển dụng (HR),
- **Tôi muốn** publish một Job để công khai lên Career Site, đóng Job khi cần, và reopen khi muốn tiếp tục tuyển dụng,
- **Để** tôi có thể kiểm soát thời điểm ứng viên nhìn thấy tin tuyển dụng và nộp đơn mà không cần dùng các trạng thái không rõ nghĩa.
- **Story Points:** 2

## SƠ ĐỒ LUỒNG NGHIỆP VỤ (Business Flow)

```mermaid
graph TD
    A[Chọn Job (DRAFT)] --> B[Nhấn Publish]
    B --> C{Validate đầy đủ thông tin?}
    C -- Lỗi --> D[Báo lỗi các trường còn thiếu]
    C -- OK --> E[Đổi Job Status = ACTIVE]
    E --> F[Hiển thị Public Link cho Job]
```

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: HR publish một Job đang là Draft**
  - **VỚI ĐIỀU KIỆN** Job đang ở trạng thái `DRAFT` và đã điền đầy đủ các thông tin bắt buộc.
  - **KHI** HR nhấn nút "Publish".
  - **THÌ** hệ thống cập nhật `jobs.status = ACTIVE` và gán `published_at = now()`.
  - Job ngay lập tức xuất hiện trên Career Site.

- **Kịch bản 2: HR không thể Publish nếu thiếu thông tin bắt buộc**
  - **VỚI ĐIỀU KIỆN** Job đang là `DRAFT` nhưng thiếu trường Tiêu đề hoặc Mô tả.
  - **KHI** HR nhấn "Publish".
  - **THÌ** hệ thống ngăn chặn và hiển thị lỗi rõ ràng.

- **Kịch bản 3: HR close một Job đang Active**
  - **VỚI ĐIỀU KIỆN** Job đang ở trạng thái `ACTIVE`.
  - **KHI** HR nhấn nút "Đóng Job" (Close).
  - **THÌ** hệ thống cập nhật `jobs.status = CLOSED`.
  - Job biến mất khỏi Career Site và ứng viên không thể nộp CV mới.
  - HR vẫn có thể quản lý các ứng viên đã nộp trong Kanban.

- **Kịch bản 4: Mở lại Job đã Đóng**
  - **VỚI ĐIỀU KIỆN** Job đang ở trạng thái `CLOSED`.
  - **KHI** HR nhấn "Mở lại Job" (Reopen).
  - **THÌ** hệ thống cập nhật `jobs.status = ACTIVE` và Job lại xuất hiện trên Career Site.

## 3. BUSINESS RULES
- Trong MVP không dùng `Unpublish` như trạng thái riêng.
- Job lifecycle chuẩn: `DRAFT → ACTIVE → CLOSED`, với `CLOSED → ACTIVE` khi reopen.
- `Close` là state transition; không phải là lỗi hệ thống.

### Job Status & Pipeline Behavior
| Job Status | Candidate Apply | Pipeline hoạt động | Email Automation |
|------------|-----------------|---------------------|------------------|
| `DRAFT`    | ❌ Không được   | ❌ Chưa có          | ❌ Không gửi     |
| `ACTIVE`   | ✅ Được         | ✅ Đầy đủ           | ✅ Gửi bình thường |
| `CLOSED`   | ❌ Bị chặn      | ✅ Vẫn hoạt động    | ✅ Vẫn gửi (ứng viên cũ vẫn đang trong process) |

### Khi Job chuyển sang CLOSED:
- Trang Job trên Career Site ẩn đi / hiển thị "Đã đóng tuyển dụng".
- Ứng viên mới KHÔNG thể nộp CV.
- Ứng viên đang trong pipeline **vẫn tiếp tục quy trình bình thường** — HR vẫn có thể move stage, đánh giá, đặt lịch phỏng vấn.
- Email automation vẫn gửi bình thường cho ứng viên cũ.
- Ứng viên đang chờ phỏng vấn KHÔNG nhận thông báo đặc biệt khi Job Close (vì họ đang trong process, không bị ảnh hưởng).

### Khi Job reopen (CLOSED → ACTIVE):
- Job xuất hiện lại trên Career Site.
- Ứng viên cũ trong pipeline tiếp tục ở stage hiện tại — không cần thao tác riêng.
- KHÔNG có thay đổi về Application Status hay Round Result.

## 4. NGOÀI PHẠM VI
- **KHÔNG** tự động đăng Job lên các nền tảng tuyển dụng bên ngoài.
- Hẹn giờ tự động publish không nằm trong phiên bản này.
