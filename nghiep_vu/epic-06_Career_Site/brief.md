# EPIC 06 — Career Site

## 1. Tóm tắt
- **Nghiệp vụ:** Trang công khai cho Candidate xem các Job đang tuyển và nộp hồ sơ trực tiếp mà không cần tài khoản.
- **Điều kiện tiên quyết:** Job phải `ACTIVE` và được publish.
- **MVP principle:** Candidate không cần tạo tài khoản để apply.

## 2. Giá trị nghiệp vụ và chỉ số
- **Giá trị nghiệp vụ:** Tạo kênh ứng tuyển đơn giản, chuyên nghiệp và dễ tiếp cận.
- **Chỉ số:**
  - Drop-off trong form apply < 10%
  - Tỷ lệ nộp đơn thành công > 95%

## 3. Quy trình nghiệp vụ
```mermaid
graph TD
  A[Candidate mở Career Site] --> B[Browse jobs]
  B --> C[Open job detail]
  C --> D[Ứng tuyển không cần tài khoản]
  D --> E[Submit form + consent + CV]
  E --> F[Application created]
  F --> G[Confirmation + magic link email]
  G --> H[Candidate tracks application]
  H --> I[Interview response by email link]
```

## 4. Phạm vi và Backlog
| ID | Tên Story | Ưu tiên | Trạng thái |
|---|---|---|---|
| US-17 | Xem Career Site | Must Have | To-do |
| US-18 | Nộp CV | Must Have | To-do |
| US-28 | Magic Link tracking | Must Have | To-do |
| US-29 | Interview Response | Must Have | To-do |

> Ghi chú: US-19 đã bị deprecated và hợp nhất vào US-29.
> US-30 là Admin Job Categories trong EP-02.
> US-33 là HR Permission Management trong EP-07.

## 5. Business Rules
- Candidate ứng tuyển không cần register/login.
- Form mặc định gồm: họ tên, email, số điện thoại, CV; custom fields là tùy chọn.
- Duplicate application phải được chặn rõ ràng và cung cấp tùy chọn xem trạng thái hoặc gửi lại Magic Link.
- Candidate phản hồi qua secure email link. Để bảo mật chống forward link, BẮT BUỘC Candidate phải nhập lại Email ứng tuyển để verify trước khi cho phép thao tác.

## 6. Product Decisions / Needs Confirmation
- Chính sách hết hạn Magic Link: TTL 30 ngày (Đã chốt). Hết hạn cần có nút yêu cầu gửi lại link mới.
- MUST-HAVE: Candidate được phép đề xuất đổi lịch phỏng vấn tối đa 1 lần sau khi nhận được lịch từ HR.
- Việc chỉnh sửa phản hồi sau lần đầu là Product Decision; mặc định MVP coi phản hồi đầu tiên là kết quả cuối.

## 7. API JSON Contracts (Tham khảo)

### 7.1. API Ứng viên nộp hồ sơ (Apply Job)
- **Endpoint:** `POST /api/v1/public/jobs/{job_id}/apply`
- **Content-Type:** `multipart/form-data`
- **Payload:**
```json
{
  "full_name": "Tran Van B",
  "email": "tranvanb@gmail.com",
  "phone": "0987654321",
  "cover_letter": "Tôi rất mong muốn tham gia công ty...",
  "file_cv": "(File Binary Object)"
}
```
- **Response (201 Created):**
```json
{
  "application_id": "app-uuid-1234",
  "status": "ACTIVE",
  "message": "Nộp hồ sơ thành công. Vui lòng kiểm tra email để nhận Magic Link."
}
```

### 7.2. API Phản hồi lịch phỏng vấn qua Magic Link
- **Endpoint:** `PUT /api/v1/public/interviews/{secure_token}/respond`
- **Request Body:**
```json
{
  "verify_email": "tranvanb@gmail.com",
  "response": "RESCHEDULE_REQUESTED",
  "reschedule_time": "2026-09-06T14:00:00Z",
  "reschedule_reason": "Tôi có lịch đột xuất vào ngày cũ."
}
```
- **Response (200 OK):**
```json
{
  "interview_id": "interview-uuid-1111",
  "status": "RESCHEDULE_REQUESTED",
  "message": "Đã gửi yêu cầu đổi lịch tới bộ phận nhân sự."
}
```

