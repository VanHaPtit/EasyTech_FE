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
- INACTIVE: job nháp, chưa publish. Giữ giá trị DB/API hiện hành, không thêm DRAFT.
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

## 7. Quy ước API JSON Contract

Request/Response của các User Story **không bắt buộc có cùng field nghiệp vụ**, vì mỗi luồng có dữ liệu khác nhau. Tuy nhiên tất cả task API phải thống nhất format contract để FE/BE đọc và implement nhất quán.

### Quy tắc chung
- Phần `HTTP Method` và `Endpoint` ở đầu task phải khớp tuyệt đối với phần `API JSON Contract` bên dưới.
- Không dùng endpoint placeholder dạng `/api/v1/resource/...` trong task đã có nghiệp vụ rõ.
- Không để lại nội dung `Auto-generated fallback`, `example_field`, hoặc response mẫu chung chung.
- Endpoint dùng prefix chuẩn `/api/v1`.
- Tên field JSON dùng `camelCase` cho API request/response, ví dụ `taxCode`, `companyId`, `createdAt`, `approvedAt`, `rejectedReason`.
- Tên cột DB trong tài liệu schema có thể dùng `snake_case`, ví dụ `tax_code`, `company_id`, `created_at`.
- ID trong API dùng `number` nếu backend dùng `Long/BIGSERIAL`; chỉ dùng `"uuid"` khi schema/backend thật sự dùng UUID.
- Datetime trong API dùng ISO-8601 string, ví dụ `"2026-08-31T10:00:00"`.
- Enum/status phải dùng đúng domain đã định nghĩa, ví dụ `PENDING`, `ACTIVE`, `REJECTED`, `BLOCKED`.

### Response wrapper chuẩn
API thành công:

```json
{
  "status": 1,
  "message": "Thao tác thành công",
  "data": {}
}
```

API thất bại:

```json
{
  "status": 0,
  "message": "Thông báo lỗi rõ ràng và có hướng xử lý",
  "data": null
}
```

### Pagination chuẩn

- API mới dùng query `page` (từ 1), `limit` (1–100), `searchText` và response `BasePagination` bên dưới. API hiện có nhận `size` thay `limit`, `keyword` thay `searchText` (Admin category giữ alias `search`). Nếu gửi cả hai alias phải cùng giá trị sau trim; khác nhau trả `400`, không âm thầm ưu tiên một bên.
- Không đổi wrapper API cũ: Email Templates giữ Spring Page (`content`, `totalElements`, `totalPages`, `number`, `size`) dù nhận thêm tên query chuẩn; các endpoint đã dùng BasePagination giữ nguyên. Không đổi chỉ số page public sang zero-based; chỉ metadata Spring Page `number` là zero-based như trước. Mặc định vẫn theo từng endpoint (Email Templates50, public Jobs20, danh sách chung10), không áp đặt lại làm vỡ client.
- Tham số `category` public Jobs vẫn là slug danh mục; không tự đổi sang `categoryId` trong lần chuẩn hóa pagination. JSON `categoryId` của Job vẫn là BIGINT/Long theo contract hiện hành.
Danh sách phân trang trả về trong `data` theo format:

```json
{
  "status": 1,
  "message": "Lấy danh sách thành công",
  "data": {
    "current_page": 1,
    "last_page": 1,
    "total": 0,
    "data": []
  }
}
```

> Lưu ý: `current_page` và `last_page` đang theo format pagination backend hiện tại. Nếu backend đổi sang `currentPage`/`lastPage`, phải cập nhật quy ước này và toàn bộ task liên quan cùng lúc.

## 8. Loading, empty state và success feedback

- Cache phía trình duyệt không phải quyền truy cập: khi logout/session expired/đổi tài khoản thì hủy query và xóa cache workspace. Danh sách template vòng dùng key kèm `companyId`; không hiển thị template tenant trước khi đăng nhập tenant mới. Backend vẫn kiểm tra ownership độc lập.
- Route tải theo nhu cầu phải có loading state và lỗi có nút tải lại; không bỏ authentication gate khi tách bundle. Không coi giảm bundle là chứng minh Core Web Vitals/performance trên thiết bị thật.

### Đồng hồ và ngày nghiệp vụ (22/10/2026)

- Rule nhận hồ sơ/publish theo `startDate`/`endDate` dùng ngày tại `Asia/Ho_Chi_Minh`, bao gồm cả ngày bắt đầu/kết thúc. Qua nửa đêm Việt Nam thì hết hạn; chỉ ẩn/chặn nộp đơn, không tự đổi trạng thái Job. Backend dùng `Clock` inject để test biên thời gian nhất quán giữa danh sách, chi tiết và submit.
- Không đổi schema/timestamp cũ: các cột `LocalDateTime` không offset tiếp tục theo timezone runtime server (`Clock.systemDefaultZone`), giữ tương thích dữ liệu cũ/JPA lifecycle. Không tự gắn UTC/Z, không chuyển đổi dữ liệu lịch sử; không tuyên bố các timestamp này có offset ISO-8601. Một migration timezone toàn hệ thống cần contract riêng.
- Formatter giao diện dùng chung: date-only `YYYY-MM-DD` giữ ngày lịch, không đổi theo timezone thiết bị; datetime cũ tiếp tục cách diễn giải timezone hiện hành, không tự gắn offset. Giá trị thiếu hoặc ngày không hợp lệ dùng fallback của từng màn hình, không ném lỗi làm crash trang. Ví dụ `2026-02-30` là không hợp lệ, không tự chuyển thành tháng3.
- Thông báo lỗi API chỉ nhận `message` dạng chuỗi không rỗng; nếu response trả object/array hoặc message trống thì dùng fallback theo ngữ cảnh. Không đưa object lỗi vào toast hoặc hiển thị chi tiết exception nội bộ.
- TTL Redis giữ prefix và số giây đã triển khai trong `AuthRedisKeys`; nội dung OTP đọc cùng TTL. Outbox dùng cùng clock cho ready/sent/retried/backoff, retry vẫn có giới hạn.
- Mọi action gọi API phải có loading state.
- Danh sách rỗng phải có empty state và CTA phù hợp.
- Hành động thành công hiển thị toast hoặc trang xác nhận theo mức độ quan trọng.

## 9. Destructive action
Các hành động như Reject, Close Job, Disable Member, Delete Round phải có confirmation modal mô tả rõ hậu quả và ảnh hưởng như gửi email, đổi trạng thái hoặc ghi audit log.

## 10. File upload
- Validate file type và size ở FE ngay khi chọn file.
- BE phải validate lại file type, size và storage policy.
- Hiển thị file name, size và lỗi rõ ràng.

## 11. AI và automation
- AI chỉ tạo recommendation; HR quyết định cuối cùng.
- Nếu hiển thị score, phải có explanation như strengths, weaknesses, missing skills.
- Ảnh hưởng tự động như gửi email hoặc cập nhật pipeline phải được nói rõ trước khi user xác nhận.

## 12. Cải tiến trong tương lai
Các nội dung như Google OAuth mở rộng, AI BYOK, Candidate đổi lịch, notification center đầy đủ, autosave toàn màn hình và branding multi-company phải được đánh dấu `Cải tiến trong tương lai` nếu chưa nằm trong MVP.
