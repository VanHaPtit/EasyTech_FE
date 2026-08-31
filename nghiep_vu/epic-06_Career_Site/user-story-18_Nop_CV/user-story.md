# 📋 User Story 18: Nộp Đơn Ứng Tuyển (Apply for Job)

## 1. MÔ TẢ USER STORY
- **Là** Ứng viên (Candidate),
- **Tôi muốn** điền form và nộp CV trực tiếp trên Career Site mà không cần tạo tài khoản,
- **Để** tôi có thể ứng tuyển nhanh, biết là hồ sơ của mình đã được nhận và không cần qua nhiều bước kỹ thuật.
- **Story Points:** 5

## SƠ ĐỒ LUỒNG NGHIỆP VỤ (Business Flow)

```mermaid
graph TD
    A[Ứng viên bấm Apply] --> B[Mở form điền thông tin]
    B --> C[Upload CV (PDF)]
    C --> D[Submit Form]
    D --> E[Lưu DB: Tạo Application]
    E --> F[Tạo Magic Link cho ứng viên]
    F --> G[Gửi Email xác nhận kèm Magic Link]
```

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: Ứng viên điền form ứng tuyển hợp lệ**
  - **VỚI ĐIỀU KIỆN** ứng viên đang xem trang chi tiết một Job.
  - **KHI** ứng viên nhấn "Ứng tuyển ngay", điền Họ tên, Email, Số điện thoại hợp lệ và tải lên CV (PDF, <5MB), đồng thời chấp nhận privacy consent.
  - **THÌ** khi nhấn "Nộp Đơn":
    - Hệ thống upload CV lên storage và lưu thông tin ứng tuyển.
    - Ứng viên được chuyển sang trang "Nộp đơn thành công!".
    - Email xác nhận chứa Magic Link được gửi đến ứng viên.

- **Kịch bản 2: Form mặc định ngắn**
  - **VỚI ĐIỀU KIỆN** Job không có custom fields bắt buộc.
  - **KHI** ứng viên mở form apply.
  - **THÌ** hệ thống chỉ hiển thị các field tối thiểu: Họ tên, Email, Số điện thoại, CV. Các câu hỏi bổ sung là optional.

- **Kịch bản 3: Validate định dạng và dung lượng CV**
  - **VỚI ĐIỀU KIỆN** ứng viên đang điền form ứng tuyển.
  - **KHI** ứng viên chọn file CV không phải định dạng PDF hoặc dung lượng >5MB.
  - **THÌ** hệ thống không upload và hiển thị lỗi ngay tại chỗ: _"Chỉ chấp nhận file PDF tối đa 5MB."_

- **Kịch bản 4: Ứng tuyển nhiều lần cùng một Job**
  - **VỚI ĐIỀU KIỆN** ứng viên đã nộp đơn thành công cho Job A với email `test@email.com`.
  - **KHI** ứng viên cố gắng nộp lại cùng Job với cùng email trong thời gian chống duplicate.
  - **THÌ** hệ thống chặn submit và hiển thị: _"Bạn đã ứng tuyển vị trí này vào ngày ..."_ kèm CTA xem trạng thái hoặc gửi lại Magic Link.

- **Kịch bản 5: Form động có câu hỏi bắt buộc**
  - **VỚI ĐIỀU KIỆN** HR đã thiết lập các trường bắt buộc cho Job.
  - **KHI** ứng viên bỏ trống và nhấn Nộp đơn.
  - **THÌ** form highlight trường thiếu và báo lỗi rõ ràng. Không submit.

- **Kịch bản 6: Đồng ý chính sách riêng tư**
  - **VỚI ĐIỀU KIỆN** ứng viên đang điền form.
  - **KHI** họ nhấn submit.
  - **THÌ** cần có checkbox đồng ý xử lý dữ liệu cá nhân cho mục đích tuyển dụng và link Privacy Policy rõ ràng.

## 3. BUSINESS RULES
- Candidate không cần Account để apply.
- AI / CV parser có thể được dùng để điền sẵn dữ liệu trong tương lai, nhưng không phải yêu cầu bắt buộc trong MVP.
- Duplicate application phải dẫn tới trạng thái "đã apply" và recovery flow thay vì dead-end.

## 4. NGOÀI PHẠM VI
- **KHÔNG** hỗ trợ Login bằng LinkedIn / Google để tự điền form.
- **KHÔNG** hỗ trợ upload từ Dropbox/Google Drive; candidate phải upload file từ máy local.
