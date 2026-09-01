# 📋 User Story 26: Nộp Đơn Ứng Tuyển (Apply for Job)

## 1. MÔ TẢ USER STORY
- **Là** Ứng viên (Candidate),
- **Tôi muốn** điền form và nộp CV trực tiếp trên Career Site mà không cần tạo tài khoản,
- **Để** tôi có thể ứng tuyển nhanh, biết là hồ sơ của mình đã được nhận và không cần qua nhiều bước kỹ thuật.
- **Story Points:** 5

## SƠ ĐỒ LUỒNG NGHIỆP VỤ (Business Flow)

```mermaid
graph TD
    A[Ứng viên bấm Apply] --> B[Mở form điền thông tin]
    B --> C["Upload CV (PDF)"]
    C --> D[Submit Form]
    D --> E["Lưu DB: Tạo Application"]
    E --> F[Tạo Magic Link cho ứng viên]
    F --> G[Gửi Email xác nhận kèm Magic Link]
    E --> H[Gửi thông báo cho HR]
```

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: Ứng viên điền form ứng tuyển hợp lệ**
  - **VỚI ĐIỀU KIỆN** ứng viên đang xem trang chi tiết một Job.
  - **KHI** ứng viên nhấn "Ứng tuyển ngay", điền Họ tên, Email, Số điện thoại hợp lệ và tải lên CV (PDF, <5MB), đồng thời chấp nhận privacy consent.
  - **THÌ** khi nhấn "Nộp Đơn":
    - Hệ thống upload CV lên storage và lưu thông tin ứng tuyển.
    - Ứng viên được chuyển sang trang "Nộp đơn thành công!".
    - Email xác nhận chứa Magic Link được gửi đến ứng viên.
    - Hệ thống gửi thông báo (qua Email hoặc In-app notification) cho HR phụ trách Job báo có ứng viên mới.

- **Kịch bản 2: Form mặc định ngắn**
  - **VỚI ĐIỀU KIỆN** Job không có custom fields bắt buộc.
  - **KHI** ứng viên mở form apply.
  - **THÌ** hệ thống chỉ hiển thị các field tối thiểu: Họ tên, Email, Số điện thoại, CV. Các câu hỏi bổ sung là optional.

- **Kịch bản 3: Validate định dạng và dung lượng CV**
  - **VỚI ĐIỀU KIỆN** ứng viên đang điền form ứng tuyển.
  - **KHI** ứng viên chọn file CV không phải định dạng PDF hoặc dung lượng >5MB.
  - **THÌ** hệ thống không upload và hiển thị lỗi ngay tại chỗ: _"Chỉ chấp nhận file PDF tối đa 5MB."_

- **Kịch bản 4: Ứng tuyển nhiều lần cùng một Job**
  - **VỚI ĐIỀU KIỆN** ứng viên đã nộp đơn cho Job A với email `test@email.com` và đơn đó đang ở trạng thái `ACTIVE`.
  - **KHI** ứng viên cố gắng nộp lại cùng Job A với cùng email đó.
  - **THÌ** hệ thống chặn submit và hiển thị: _"Bạn đã ứng tuyển vị trí này vào ngày [ngày nộp]."_ kèm CTA xem trạng thái hoặc gửi lại Magic Link.

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

### Duplicate Application Rule
- **Chặn duplicate:** Nếu Application của email này + job này đang ở trạng thái `ACTIVE` → chặn, hiển thị "Bạn đã ứng tuyển vị trí này vào [ngày]..." + CTA xem trạng thái.
- **Cho phép apply lại:** Nếu Application trước đó của email này cho job này đã bị `REJECTED` → Candidate ĐƯỢC PHÉP nộp đơn mới (Application cũ giữ nguyên làm lịch sử, Application mới được tạo với status = ACTIVE).
- **Không dùng time window:** Duplicate check dựa trên `Application.status`, không dựa theo số ngày. Candidate bị reject có thể apply lại bất kỳ lúc nào khi Job còn `ACTIVE`.

## 4. NGOÀI PHẠM VI
- **KHÔNG** hỗ trợ Login bằng LinkedIn / Google để tự điền form.
- **KHÔNG** hỗ trợ upload từ Dropbox/Google Drive; candidate phải upload file từ máy local.
