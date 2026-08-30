# UX Conventions - EasyTech Recruitment Platform

## 1. Mục tiêu
Tài liệu này định nghĩa các nguyên tắc UX và business convention dùng chung cho EasyTech HRM MVP. Tất cả Epic, User Story và Task phải tuân thủ nội dung này.

## 2. Quy ước trạng thái

### Company Status
- PENDING: doanh nghiệp đã đăng ký và đang chờ Admin duyệt.
- ACTIVE: doanh nghiệp được duyệt và có quyền sử dụng hệ thống.
- REJECTED: doanh nghiệp bị từ chối, có lý do và có thể chỉnh sửa để resubmit.

### User Status
- PENDING: tài khoản được tạo và đang chờ duyệt theo Company.
- ACTIVE: tài khoản được kích hoạt và có quyền truy cập bình thường.
- INACTIVE: tài khoản bị vô hiệu hóa bởi Admin.
- BLOCKED: tài khoản bị khóa hoặc suspension.

> Không dùng trạng thái `REJECTED` cho User. Khi Admin reject đăng ký doanh nghiệp, trạng thái chuẩn là Company = REJECTED, User = PENDING. INACTIVE và BLOCKED là trạng thái hạn chế truy cập tài khoản riêng, không phải kết quả mặc định của kết quả từ chối đăng ký.

### Job Status
- DRAFT: job nháp, chưa publish.
- ACTIVE: job đã publish và đang nhận hồ sơ.
- CLOSED: job đã dừng nhận hồ sơ.

### Application Status
- ACTIVE: hồ sơ đang được xem xét.
- REJECTED: hồ sơ bị từ chối.
- HIRED: hồ sơ được tuyển sau hành động Hire rõ ràng của HR.

### Pipeline Stage và Round Result
- Pipeline Stage là vị trí hiện tại trong quy trình tuyển dụng, ví dụ Application Received, CV Screening, Technical Interview.
- Round Result là kết quả của một vòng: IN_PROGRESS, PASSED, FAILED.

> PASSED không phải Application Status. Final round PASSED không tự động tạo HIRED; HIRED chỉ xảy ra khi HR thực hiện hành động Hire rõ ràng.

## 3. Authentication khác Workspace Authorization

Authentication chỉ xác minh credentials hoặc token:
- Email/password hợp lệ thì authentication thành công.
- Email/password sai thì login lỗi.

Workspace Authorization quyết định user có được vào workspace hay không:
- Company = ACTIVE, User = ACTIVE -> vào HR Workspace, onboarding hoặc dashboard.
- Company = PENDING, User = PENDING -> redirect /pending.
- Company = REJECTED, User = PENDING -> redirect /registration/rejected.
- User = INACTIVE hoặc BLOCKED -> từ chối truy cập.

## 4. Flow đăng ký chuẩn
Đăng ký -> Company = PENDING, User = PENDING -> Chờ duyệt page -> Admin xem xét -> Duyệt: Company = ACTIVE, User = ACTIVE -> Từ chối: Company = REJECTED, User = PENDING -> Gửi lại: Company = PENDING, User = PENDING.

## 5. Frontend validation
- Feedback nhanh và hiển thị ngay dưới field.
- Không xóa toàn bộ form khi validation không đạt.
- Vô hiệu hóa nút submit/save khi request đang chạy để tránh gửi lặp.
- Trường bắt buộc phải có dấu *; trường tùy chọn ghi rõ khi cần.

## 6. Backend validation
- Backend là source-of-truth cho validation và authorization.
- Luôn validate trường bắt buộc, format, enum/status, ownership theo company_id và role.
- Thông báo lỗi phải trả lời được: điều gì sai và user cần làm gì.

## 7. Loading, empty state và success feedback
- Mọi action gọi API phải có loading state.
- Danh sách rỗng phải có empty state và CTA phù hợp.
- Hành động thành công hiển thị toast hoặc trang xác nhận theo mức độ quan trọng.

## 8. Destructive action
Các hành động như Reject, Close Job, Disable Member, Delete Round phải có confirmation modal mô tả rõ hậu quả và ảnh hưởng như gửi email, đổi trạng thái hoặc ghi audit log.

## 9. File upload
- Validate file type và size ở FE ngay khi chọn file.
- BE phải validate lại file type, size và storage policy.
- Hiển thị file name, size và lỗi rõ ràng.

## 10. AI và automation
- AI chỉ tạo recommendation; HR quyết định cuối cùng.
- Nếu hiển thị score, phải có explanation như strengths, weaknesses, missing skills.
- Ảnh hưởng tự động như gửi email hoặc cập nhật pipeline phải được nói rõ trước khi user xác nhận.

## 11. Cải tiến trong tương lai
Các nội dung như Google OAuth mở rộng, AI BYOK, Candidate đổi lịch, notification center đầy đủ, autosave toàn màn hình và branding multi-company phải được đánh dấu `Cải tiến trong tương lai` nếu chưa nằm trong MVP.