# 📋 Product Backlog — EasyTech Recruitment Platform

> **Phiên bản:** v1.0 · **Cập nhật:** 2026-08-26
> **Stack FE:** React 19 + Vite + TypeScript + TailwindCSS v4
> **Stack BE:** Spring Boot (Java) · **AI:** Python FastAPI Agent

---

## Quy ước

| Ký hiệu | Ý nghĩa |
|----------|---------|
| 🔴 Must | Bắt buộc làm — MVP |
| 🟡 Should | Nên làm nếu kịp |
| 🟢 Could | Mở rộng sau |
| `[FE]` | Task Frontend |
| `[BE]` | Task Backend |
| `[AI]` | Task AI/Agent |
| `[DB]` | Task Database/Schema |
| `[INFRA]` | Task DevOps/Config |
| SP | Story Points (1=nhỏ, 2=trung bình, 3=lớn, 5=rất lớn) |

---

## 📦 DANH SÁCH EPIC

| # | Epic | Ưu tiên | Mô tả ngắn |
|---|------|---------|------------|
| EP-01 | Authentication & Onboarding | 🔴 Must | Đăng nhập, đăng ký, phân quyền HR/Admin |
| EP-02 | Admin Area | 🔴 Must | Admin kiểm duyệt doanh nghiệp |
| EP-03 | HR Dashboard & Job Management | 🔴 Must | CRUD job, AI JD Writer, publish |
| EP-04 | Pipeline & Automation | 🔴 Must | Cấu hình vòng, email tự động, Pass/Fail |
| EP-05 | Candidate & Application Management | 🔴 Must | Kanban, List view, CandidateDrawer |
| EP-06 | Career Site (Public) | 🔴 Must | Trang công khai cho ứng viên nộp CV |
| EP-07 | Settings & Configuration | 🟡 Should | Thông tin DN, Email Template, AI Provider |
| EP-08 | AI Features | 🟡 Should | CV Scoring, AI Suggestions, AI JD Writer |

---

---

## EP-01 · Authentication & Onboarding

> **Mục tiêu:** Cho phép HR/Admin đăng nhập, HR đăng ký hồ sơ doanh nghiệp và chờ Admin duyệt.

---

### STORY-01 · HR Đăng nhập vào hệ thống

> **Là** HR,
> **Tôi muốn** đăng nhập bằng email/password hoặc Google OAuth,
> **Để** truy cập Dashboard quản trị tuyển dụng.

**Ưu tiên:** 🔴 Must · **SP:** 3

**Điều kiện hoàn thành (DoD):**
- [ ] Đăng nhập thành công → redirect `/dashboard`
- [ ] Đăng nhập thất bại → hiển thị thông báo lỗi
- [ ] Token được lưu (localStorage hoặc cookie httpOnly)
- [ ] Route `/dashboard` được bảo vệ bằng Auth Guard

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-01-01 | Thiết kế API endpoint `POST /api/auth/login` (email/password) | `[BE]` | 2 | Trả về accessToken + refreshToken |
| T-01-02 | Thiết kế API endpoint `POST /api/auth/google` (Google OAuth) | `[BE]` | 2 | Nhận idToken, verify, trả JWT |
| T-01-03 | Tạo `AuthContext` + `useAuth` hook trong FE | `[FE]` | 2 | Lưu user info, token, loading state |
| T-01-04 | Implement `PrivateRoute` HOC bảo vệ `/dashboard/*` | `[FE]` | 1 | Redirect `/login` nếu chưa auth |
| T-01-05 | Kết nối form Login (`LoginPage.tsx`) với `AuthService.login()` | `[FE]` | 2 | Xử lý loading, error state |
| T-01-06 | Integrate Google OAuth button với `@react-oauth/google` | `[FE]` | 2 | Thay mock `handleGoogleLogin` |
| T-01-07 | Implement refresh token logic (axios interceptor) | `[FE]` | 2 | Tự động renew token khi 401 |
| T-01-08 | Tạo bảng `users` theo schema đã thiết kế | `[DB]` | 1 | Bao gồm `role`, `status`, `google_id` |

---

### STORY-02 · HR Đăng ký tài khoản và hồ sơ doanh nghiệp

> **Là** HR mới,
> **Tôi muốn** đăng ký tài khoản và điền hồ sơ công ty (2 bước),
> **Để** gửi đơn xin sử dụng nền tảng EasyTech.

**Ưu tiên:** 🔴 Must · **SP:** 3

**Điều kiện hoàn thành (DoD):**
- [ ] Form 2 bước (User Info → Company Info) hoạt động đúng
- [ ] Submit thành công → trạng thái `PENDING`, redirect màn chờ duyệt
- [ ] Dữ liệu lưu vào `users` + `businesses`

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-02-01 | Thiết kế API `POST /api/auth/register` | `[BE]` | 2 | Tạo user + business, status = PENDING |
| T-02-02 | Kết nối Register form step 1+2 (`LoginPage.tsx`) với API | `[FE]` | 2 | Validate required fields |
| T-02-03 | Tạo màn hình "Chờ duyệt" (`/pending`) | `[FE]` | 1 | Hiện trạng thái PENDING, hướng dẫn |
| T-02-04 | Thiết kế API `GET /api/auth/me` kiểm tra business status | `[BE]` | 1 | HR chỉ vào dashboard khi status = ACTIVE |
| T-02-05 | Logic redirect sau login: PENDING → `/pending`, ACTIVE → `/dashboard` | `[FE]` | 1 | Dựa vào `business.status` |
| T-02-06 | Tạo bảng `businesses` theo schema | `[DB]` | 1 | status: PENDING/ACTIVE/REJECTED/BLOCKED |

---

### STORY-03 · HR Onboarding hồ sơ doanh nghiệp (sau khi được duyệt)

> **Là** HR đã được Admin duyệt,
> **Tôi muốn** cập nhật đầy đủ hồ sơ công ty (logo, địa chỉ, website),
> **Để** Career Site hiển thị thông tin đúng của công ty tôi.

**Ưu tiên:** 🟡 Should · **SP:** 2

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-03-01 | API `PUT /api/businesses/{id}/profile` cập nhật thông tin DN | `[BE]` | 1 | |
| T-03-02 | API `POST /api/businesses/{id}/logo` upload logo | `[BE]` | 2 | Multipart upload, lưu path |
| T-03-03 | Kết nối `OnboardingPage.tsx` với API cập nhật hồ sơ | `[FE]` | 2 | Hiện preview logo sau upload |
| T-03-04 | Tạo bảng `business_profiles` | `[DB]` | 1 | logo_url, brand_color, description |

---

### STORY-04 · Admin Đăng nhập riêng

> **Là** Admin EasyTech,
> **Tôi muốn** đăng nhập vào khu vực Admin riêng biệt,
> **Để** quản lý danh sách doanh nghiệp.

**Ưu tiên:** 🔴 Must · **SP:** 1

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-04-01 | Kết nối `AdminLogin.tsx` với API login | `[FE]` | 1 | Role check: chỉ ADMIN được vào |
| T-04-02 | Protect route `/admin` bằng AdminGuard (role = ADMIN) | `[FE]` | 1 | |
| T-04-03 | Seed tài khoản Admin mặc định trong DB | `[DB]` | 1 | `admin@easytech.vn` |

---

---

## EP-02 · Admin Area

> **Mục tiêu:** Admin kiểm tra và duyệt/từ chối doanh nghiệp đăng ký.

---

### STORY-05 · Admin xem danh sách doanh nghiệp và duyệt hồ sơ

> **Là** Admin,
> **Tôi muốn** xem danh sách doanh nghiệp đang chờ duyệt, xem chi tiết và approve/reject,
> **Để** kiểm soát chất lượng các đơn vị sử dụng nền tảng.

**Ưu tiên:** 🔴 Must · **SP:** 5

**Điều kiện hoàn thành (DoD):**
- [ ] Danh sách load từ API (không còn mock data)
- [ ] Filter theo status hoạt động đúng
- [ ] Approve → business.status = ACTIVE, Career Site được tạo tự động
- [ ] Reject → business.status = REJECTED, lý do được lưu
- [ ] Có Audit Log sau mỗi hành động

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-05-01 | API `GET /api/admin/businesses?status=&search=&page=` | `[BE]` | 2 | Filter theo status, có phân trang |
| T-05-02 | API `GET /api/admin/businesses/{id}` chi tiết một DN | `[BE]` | 1 | |
| T-05-03 | API `PUT /api/admin/businesses/{id}/approve` duyệt DN | `[BE]` | 2 | Đổi status = ACTIVE, ghi audit log, tạo career site |
| T-05-04 | API `PUT /api/admin/businesses/{id}/reject` từ chối DN | `[BE]` | 1 | Lưu `rejected_reason`, ghi audit log |
| T-05-05 | API `PUT /api/admin/businesses/{id}/block` khóa DN | `[BE]` | 1 | Đổi status = BLOCKED |
| T-05-06 | Kết nối `AdminDashboard.tsx` table với API (thay mock data) | `[FE]` | 3 | Loading/empty/error states |
| T-05-07 | Kết nối nút Approve/Reject/Block với API | `[FE]` | 2 | Optimistic update sau action |
| T-05-08 | Kết nối Business Detail Drawer với API | `[FE]` | 1 | Hiện đúng dữ liệu DN từ server |
| T-05-09 | Ghi `AuditLog` khi approve/reject | `[BE]` | 1 | admin_id, action, business_id, timestamp |
| T-05-10 | Tạo Career Site tự động khi approve | `[BE]` | 2 | Tạo `career_site_settings`, sinh slug |
| T-05-11 | Tạo bảng `audit_logs` | `[DB]` | 1 | |

---

---

## EP-03 · HR Dashboard & Job Management

> **Mục tiêu:** HR tạo và quản lý tin tuyển dụng, dùng AI viết JD, publish job ra Career Site.

---

### STORY-06 · HR xem Dashboard tổng quan tuyển dụng

> **Là** HR,
> **Tôi muốn** xem thống kê tổng quan (số ứng viên, đang xử lý, đạt/không đạt),
> **Để** nắm bắt nhanh tình hình tuyển dụng của công ty.

**Ưu tiên:** 🟡 Should · **SP:** 3

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-06-01 | API `GET /api/dashboard/stats` trả về 4 thẻ thống kê | `[BE]` | 2 | Filter theo `business_id` từ JWT |
| T-06-02 | API `GET /api/dashboard/chart?months=6` data biểu đồ theo tháng | `[BE]` | 2 | |
| T-06-03 | API `GET /api/dashboard/top-jobs?limit=5` | `[BE]` | 1 | Top job nhiều ứng viên nhất |
| T-06-04 | Kết nối `Dashboard.tsx` với 3 API trên (thay mock data) | `[FE]` | 3 | Loading skeleton, error state |
| T-06-05 | Vẽ biểu đồ cột bằng Recharts hoặc Chart.js | `[FE]` | 2 | Cột tháng cuối highlight màu khác |

---

### STORY-07 · HR xem danh sách Tin tuyển dụng

> **Là** HR,
> **Tôi muốn** xem tất cả tin tuyển dụng của công ty với bộ lọc và sắp xếp,
> **Để** theo dõi và quản lý các vị trí đang tuyển.

**Ưu tiên:** 🔴 Must · **SP:** 3

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-07-01 | Tạo bảng `job_posts` theo schema | `[DB]` | 1 | title, description, salary, location, status, business_id |
| T-07-02 | API `GET /api/jobs?search=&status=&page=&size=` | `[BE]` | 2 | Bắt buộc filter business_id từ JWT |
| T-07-03 | API `GET /api/jobs/stats` (4 thẻ thống kê đầu trang) | `[BE]` | 1 | |
| T-07-04 | Kết nối `Jobs.tsx` với API danh sách job | `[FE]` | 2 | Pagination, filter, loading/empty |
| T-07-05 | Kết nối 4 thẻ stats với API | `[FE]` | 1 | |

---

### STORY-08 · HR tạo Tin tuyển dụng mới với AI JD Writer

> **Là** HR,
> **Tôi muốn** tạo tin tuyển dụng mới qua wizard 3 panel (Form + AI JD + Preview),
> **Để** nhanh chóng có JD chuyên nghiệp với sự hỗ trợ của AI.

**Ưu tiên:** 🔴 Must · **SP:** 5

**Điều kiện hoàn thành (DoD):**
- [ ] Form nhập thông tin job hoạt động đúng
- [ ] AI JD Generator gọi API thật và trả về JD Markdown
- [ ] Live Preview render đúng Markdown
- [ ] Lưu nháp thành công → tạo record trong DB với ID thật

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-08-01 | API `POST /api/jobs` tạo job mới (status = INACTIVE) | `[BE]` | 2 | Validate required fields |
| T-08-02 | API `POST /api/ai/jd-writer` gọi AI Agent sinh JD | `[BE]` `[AI]` | 3 | Nhận prompt, gọi LLM, trả Markdown |
| T-08-03 | AI Agent: JD Writer (prompt engineering, stream response) | `[AI]` | 5 | Python FastAPI, streaming SSE |
| T-08-04 | Kết nối Panel 1 (form) của `JobCreateWizard.tsx` với API tạo job | `[FE]` | 2 | Thay `handleSaveDraft` hardcode |
| T-08-05 | Kết nối Panel 2 (AI) với API `/api/ai/jd-writer` | `[FE]` | 2 | Loading state, hiện stream kết quả |
| T-08-06 | Auto-fill form từ AI response (title, description) | `[FE]` | 1 | |
| T-08-07 | Render Markdown trong Live Preview (`react-markdown`) | `[FE]` | 1 | Thêm dependency |
| T-08-08 | Sau khi lưu, redirect đến `/dashboard/jobs/{id}/rounds` dùng ID thật | `[FE]` | 1 | Bỏ hardcode `new-job-123` |
| T-08-09 | Tạo bảng `job_categories` và seed dữ liệu | `[DB]` | 1 | IT, Finance, Marketing... |

---

### STORY-09 · HR xem và chỉnh sửa Chi tiết Job

> **Là** HR,
> **Tôi muốn** xem đầy đủ thông tin một tin tuyển dụng và chỉnh sửa khi cần,
> **Để** cập nhật nội dung trước khi publish.

**Ưu tiên:** 🔴 Must · **SP:** 2

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-09-01 | API `GET /api/jobs/{id}` chi tiết job (bao gồm rounds, app count) | `[BE]` | 1 | |
| T-09-02 | API `PUT /api/jobs/{id}` cập nhật job | `[BE]` | 1 | |
| T-09-03 | Kết nối `JobDetail.tsx` với API | `[FE]` | 2 | Render Markdown description |
| T-09-04 | Kết nối `EditJobModal.tsx` với API update | `[FE]` | 1 | Reload sau khi lưu |

---

### STORY-10 · HR Publish Job ra Career Site

> **Là** HR,
> **Tôi muốn** publish tin tuyển dụng ra Career Site sau khi đã cấu hình pipeline,
> **Để** ứng viên có thể xem và nộp CV.

**Ưu tiên:** 🔴 Must · **SP:** 2

**Điều kiện hoàn thành (DoD):**
- [ ] Publish thành công → `job.status = ACTIVE`
- [ ] Job hiển thị trên Career Site của DN
- [ ] Nếu chưa có vòng → hiển thị lỗi, không cho publish

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-10-01 | API `PUT /api/jobs/{id}/publish` — validate pipeline trước | `[BE]` | 2 | Lỗi 400 nếu chưa cấu hình vòng |
| T-10-02 | Kết nối `PublishJobModal.tsx` với API publish | `[FE]` | 1 | Hiện lỗi nếu thiếu pipeline |
| T-10-03 | Hiệu ứng confetti sau publish thành công | `[FE]` | 1 | Dùng `canvas-confetti` |

---

---

## EP-04 · Pipeline & Automation

> **Mục tiêu:** HR cấu hình vòng tuyển dụng linh hoạt, hệ thống tự động chuyển vòng và gửi email khi HR bấm Pass/Fail.

---

### STORY-11 · HR cấu hình Pipeline vòng tuyển dụng

> **Là** HR,
> **Tôi muốn** thiết lập các vòng tuyển dụng cho từng job (số vòng, tên, email template),
> **Để** hệ thống tự động biết gửi email gì và chuyển ứng viên đến đâu khi Pass/Fail.

**Ưu tiên:** 🔴 Must · **SP:** 5

**Điều kiện hoàn thành (DoD):**
- [ ] Thêm/xóa/sửa vòng hoạt động đúng với API
- [ ] Gắn email template Pass/Fail cho từng vòng
- [ ] Thứ tự vòng được xác định bởi `orderIndex`
- [ ] Job không publish được nếu chưa có vòng

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-11-01 | Tạo bảng `job_rounds` theo schema | `[DB]` | 1 | name, orderIndex, passEmailTemplateId, failEmailTemplateId |
| T-11-02 | API `GET /api/jobs/{id}/rounds` lấy danh sách vòng | `[BE]` | 1 | |
| T-11-03 | API `POST /api/jobs/{id}/rounds` tạo vòng mới | `[BE]` | 1 | |
| T-11-04 | API `PUT /api/jobs/{id}/rounds/{roundId}` sửa vòng | `[BE]` | 1 | |
| T-11-05 | API `DELETE /api/jobs/{id}/rounds/{roundId}` xóa vòng | `[BE]` | 1 | |
| T-11-06 | API `PUT /api/jobs/{id}/rounds/reorder` sắp xếp lại thứ tự | `[BE]` | 1 | |
| T-11-07 | Kết nối `RoundsConfig.tsx` với các API CRUD vòng | `[FE]` | 3 | Loading, confirm xóa |
| T-11-08 | Dropdown chọn Email Template cho Pass/Fail từng vòng | `[FE]` | 2 | Gọi API lấy danh sách template |
| T-11-09 | Drag-drop reorder vòng (thư viện `@dnd-kit/core`) | `[FE]` | 2 | Optional nếu có thời gian |

---

### STORY-12 · Hệ thống Email Automation (Pass/Fail trigger)

> **Là** Hệ thống,
> **Khi** HR bấm Pass hoặc Fail cho ứng viên,
> **Tôi muốn** tự động gửi email đúng template theo cấu hình pipeline và chuyển vòng,
> **Để** quy trình tuyển dụng chạy tự động không cần thao tác thủ công.

**Ưu tiên:** 🔴 Must · **SP:** 5

**Điều kiện hoàn thành (DoD):**
- [ ] Pass → chuyển sang vòng tiếp theo + gửi email Pass template của vòng đó
- [ ] Fail → status = REJECTED + gửi email Fail template
- [ ] Vòng cuối + Pass → status = PASSED
- [ ] Email có đủ biến: `{{candidate_name}}`, `{{job_title}}`, `{{company_name}}`
- [ ] Lưu `EmailLog` sau mỗi lần gửi

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-12-01 | API `POST /api/applications/{id}/evaluate` nhận `{ result: PASS\|FAIL }` | `[BE]` | 3 | Logic chuyển vòng, gọi email service |
| T-12-02 | Email Service: thay thế biến `{{variable}}` trong template | `[BE]` | 2 | |
| T-12-03 | Email Service: gửi email qua SMTP/Mailtrap | `[BE]` | 2 | Sandbox SMTP cho dev |
| T-12-04 | Lưu `EmailLog` (SENT/FAILED) sau mỗi lần gửi | `[BE]` | 1 | |
| T-12-05 | Tạo bảng `email_logs` | `[DB]` | 1 | |
| T-12-06 | Tạo bảng `application_round_statuses` | `[DB]` | 1 | Lịch sử mỗi vòng của ứng viên |
| T-12-07 | Kết nối nút Pass/Fail trong `CandidateDrawer.tsx` với API evaluate | `[FE]` | 2 | Confirm modal, reload sau action |
| T-12-08 | Refresh Kanban/List sau khi evaluate | `[FE]` | 1 | |

---

### STORY-13 · HR đặt lịch phỏng vấn

> **Là** HR,
> **Tôi muốn** đặt lịch phỏng vấn cho ứng viên và hệ thống tự động gửi email mời,
> **Để** ứng viên nhận được lịch đúng hẹn.

**Ưu tiên:** 🟡 Should · **SP:** 3

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-13-01 | Tạo bảng `interview_schedules` | `[DB]` | 1 | |
| T-13-02 | API `POST /api/applications/{id}/interview` tạo lịch phỏng vấn | `[BE]` | 2 | Tự động gửi email mời |
| T-13-03 | Kết nối `InterviewSchedulerModal.tsx` với API | `[FE]` | 2 | Date/time picker, template selector |
| T-13-04 | Hiển thị lịch phỏng vấn trong CandidateDrawer | `[FE]` | 1 | |

---

---

## EP-05 · Candidate & Application Management

> **Mục tiêu:** HR quản lý ứng viên đã nộp CV theo dạng Kanban hoặc List, xem chi tiết và đánh giá.

---

### STORY-14 · HR xem danh sách ứng viên — Kanban Board

> **Là** HR,
> **Tôi muốn** xem ứng viên theo dạng Kanban board với 4 cột (Mới/Đang xử lý/Đạt/Không đạt),
> **Để** có cái nhìn trực quan về pipeline tuyển dụng.

**Ưu tiên:** 🟡 Should · **SP:** 5

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-14-01 | API `GET /api/applications?jobId=&status=&search=` | `[BE]` | 2 | Filter bắt buộc business_id |
| T-14-02 | Kết nối `Kanban.tsx` với API | `[FE]` | 3 | Group theo status column |
| T-14-03 | Drag & Drop card giữa các cột (gọi evaluate API) | `[FE]` | 3 | Dùng `@dnd-kit/core` |
| T-14-04 | Filter job và status hoạt động | `[FE]` | 1 | |
| T-14-05 | Loading skeleton và empty state | `[FE]` | 1 | |

---

### STORY-15 · HR xem danh sách ứng viên — List/Table view

> **Là** HR,
> **Tôi muốn** xem ứng viên theo dạng bảng với đầy đủ cột thông tin,
> **Để** tìm kiếm và lọc nhanh hơn so với Kanban.

**Ưu tiên:** 🔴 Must · **SP:** 3

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-15-01 | Kết nối `CandidatesList.tsx` với API (reuse T-14-01) | `[FE]` | 2 | |
| T-15-02 | Pagination server-side | `[FE]` | 1 | |
| T-15-03 | Click row → mở `CandidateDrawer` | `[FE]` | 1 | |

---

### STORY-16 · HR xem chi tiết và đánh giá ứng viên (CandidateDrawer)

> **Là** HR,
> **Tôi muốn** xem chi tiết một ứng viên (thông tin, CV, AI score, lịch sử vòng) trong drawer bên phải,
> **Để** đánh giá và quyết định Pass/Fail.

**Ưu tiên:** 🔴 Must · **SP:** 5

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-16-01 | API `GET /api/applications/{id}` chi tiết đầy đủ | `[BE]` | 2 | CV link, rounds history, AI score |
| T-16-02 | Kết nối `CandidateDrawer.tsx` với API chi tiết | `[FE]` | 3 | Thay mock data |
| T-16-03 | Hiển thị CV link/download | `[FE]` | 1 | |
| T-16-04 | Hiển thị lịch sử vòng (timeline) | `[FE]` | 1 | |
| T-16-05 | Hiển thị AI Matching Score | `[FE]` | 1 | Từ cv_analyses |
| T-16-06 | Hiển thị lịch sử email đã gửi cho ứng viên | `[FE]` | 1 | Từ email_logs |

---

---

## EP-06 · Career Site (Public)

> **Mục tiêu:** Ứng viên truy cập Career Site công khai của doanh nghiệp, xem job và nộp CV.

---

### STORY-17 · Ứng viên xem Career Site của doanh nghiệp

> **Là** Ứng viên,
> **Tôi muốn** xem trang tuyển dụng của công ty với danh sách job đang mở,
> **Để** tìm hiểu và ứng tuyển vị trí phù hợp.

**Ưu tiên:** 🔴 Must · **SP:** 3

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-17-01 | API `GET /api/public/companies/{slug}` thông tin DN công khai | `[BE]` | 1 | Không cần auth |
| T-17-02 | API `GET /api/public/companies/{slug}/jobs?status=ACTIVE` | `[BE]` | 1 | Chỉ trả job ACTIVE |
| T-17-03 | Kết nối `CompanyCareerSitePage.tsx` với API | `[FE]` | 2 | Hiện logo, tên DN, danh sách job |
| T-17-04 | Tạo bảng `career_site_settings` | `[DB]` | 1 | primary_color, banner_url, description |
| T-17-05 | Kết nối `CareerHome.tsx` (EasyTech-wide) với API | `[FE]` | 2 | Tổng hợp job từ tất cả DN |

---

### STORY-18 · Ứng viên xem chi tiết và nộp CV

> **Là** Ứng viên,
> **Tôi muốn** xem đầy đủ thông tin job và điền form nộp CV,
> **Để** ứng tuyển vào vị trí mình quan tâm.

**Ưu tiên:** 🔴 Must · **SP:** 5

**Điều kiện hoàn thành (DoD):**
- [ ] Nộp CV thành công → tạo `Candidate` + `Application` trong DB
- [ ] Upload file CV (PDF/DOCX, tối đa 5MB)
- [ ] Gửi email xác nhận tự động cho ứng viên
- [ ] HR thấy application mới trong Dashboard

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-18-01 | API `GET /api/public/jobs/{slug}` chi tiết job public | `[BE]` | 1 | |
| T-18-02 | Tạo bảng `candidates` và `applications` theo schema | `[DB]` | 1 | |
| T-18-03 | API `POST /api/public/jobs/{slug}/apply` nộp hồ sơ | `[BE]` | 3 | Upload CV, tạo Candidate+Application |
| T-18-04 | Upload CV lên storage (local hoặc S3-compatible) | `[BE]` | 2 | |
| T-18-05 | Gửi email xác nhận đã nhận hồ sơ cho ứng viên | `[BE]` | 1 | Template "Cảm ơn đã ứng tuyển" |
| T-18-06 | Kết nối `CareerJobDetail.tsx` với API | `[FE]` | 1 | |
| T-18-07 | Kết nối `CareerApplyForm.tsx` với API nộp hồ sơ | `[FE]` | 2 | Upload CV, validation, success screen |

---

### STORY-19 · Ứng viên phản hồi lịch phỏng vấn

> **Là** Ứng viên,
> **Tôi muốn** nhận email mời phỏng vấn và có thể đồng ý hoặc xin đổi lịch,
> **Để** xác nhận lịch phỏng vấn thuận tiện.

**Ưu tiên:** 🟡 Should · **SP:** 3

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-19-01 | Link "Đồng ý" / "Xin đổi lịch" trong email có token xác thực | `[BE]` | 2 | Token 1 lần, hết hạn 48h |
| T-19-02 | API `GET /api/public/interviews/respond?token=` | `[BE]` | 1 | Verify token |
| T-19-03 | API `PUT /api/public/interviews/respond` lưu phản hồi | `[BE]` | 1 | CONFIRMED / RESCHEDULE_REQUESTED |
| T-19-04 | Kết nối `InterviewResponsePage.tsx` với API | `[FE]` | 1 | |

---

---

## EP-07 · Settings & Configuration

> **Mục tiêu:** HR cấu hình thông tin doanh nghiệp, email template, AI provider.

---

### STORY-20 · HR quản lý Email Templates

> **Là** HR,
> **Tôi muốn** tạo, sửa, xóa các mẫu email,
> **Để** hệ thống dùng đúng template theo từng vòng.

**Ưu tiên:** 🔴 Must · **SP:** 3

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-20-01 | Tạo bảng `email_templates` | `[DB]` | 1 | name, subject, body (HTML), type, business_id |
| T-20-02 | API CRUD `email_templates` | `[BE]` | 2 | GET list, POST, PUT, DELETE |
| T-20-03 | Kết nối tab Email Templates trong `Settings.tsx` với API | `[FE]` | 3 | Thay mock data |
| T-20-04 | Rich text editor cho nội dung email (TipTap hoặc Quill) | `[FE]` | 2 | Hỗ trợ biến `{{variable}}` |
| T-20-05 | Preview email sau khi thay biến mẫu | `[FE]` | 1 | |
| T-20-06 | Seed 4 template mặc định (Mời PV, Pass, Fail, Cảm ơn) | `[DB]` | 1 | |

---

### STORY-21 · HR cập nhật thông tin doanh nghiệp

> **Là** HR,
> **Tôi muốn** cập nhật tên công ty, số điện thoại, địa chỉ, website và logo,
> **Để** Career Site hiển thị thông tin chính xác.

**Ưu tiên:** 🟡 Should · **SP:** 2

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-21-01 | Kết nối tab "Thông tin chung" trong `Settings.tsx` với API | `[FE]` | 1 | Refer T-03-01 |
| T-21-02 | Upload / thay logo công ty | `[FE]` | 1 | Refer T-03-02 |

---

### STORY-22 · HR cấu hình AI Provider & API Key

> **Là** HR,
> **Tôi muốn** cấu hình nhà cung cấp AI và API Key,
> **Để** các tính năng AI hoạt động với provider của tôi.

**Ưu tiên:** 🟡 Should · **SP:** 3

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-22-01 | Tạo bảng `ai_provider_configs` | `[DB]` | 1 | provider_name, api_key (encrypted), is_active |
| T-22-02 | API `GET /api/settings/ai-providers` | `[BE]` | 1 | Mask API key (chỉ show 4 ký tự cuối) |
| T-22-03 | API `PUT /api/settings/ai-providers/{id}/key` | `[BE]` | 1 | Encrypt trước khi lưu |
| T-22-04 | Kết nối tab AI Providers trong `Settings.tsx` với API | `[FE]` | 2 | `ApiKeyModal` kết nối thật |

---

---

## EP-08 · AI Features

> **Mục tiêu:** AI chấm điểm CV theo JD, AI gợi ý câu hỏi phỏng vấn.

---

### STORY-23 · AI chấm điểm CV theo JD (CV Scoring)

> **Là** Hệ thống,
> **Khi** ứng viên nộp CV,
> **Tôi muốn** AI tự động phân tích và chấm điểm độ khớp giữa CV và JD,
> **Để** HR có thêm cơ sở đánh giá nhanh và khách quan.

**Ưu tiên:** 🟡 Should · **SP:** 5

**Điều kiện hoàn thành (DoD):**
- [ ] AI trả về: score (0-100), strengths, weaknesses, matchedSkills, missingSkills
- [ ] Kết quả hiển thị trong CandidateDrawer
- [ ] Có disclaimer: "Đây là gợi ý AI, HR tự quyết định cuối cùng"

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-23-01 | Tạo bảng `cv_analyses` | `[DB]` | 1 | score, strengths, weaknesses, matchedSkills, missingSkills |
| T-23-02 | AI Agent: CV Scoring (parse CV PDF → embedding → match JD) | `[AI]` | 5 | Python FastAPI, LangChain |
| T-23-03 | API `POST /api/applications/{id}/analyze-cv` trigger scoring | `[BE]` | 2 | Async background job |
| T-23-04 | Auto trigger CV scoring sau khi ứng viên nộp CV | `[BE]` | 1 | |
| T-23-05 | Hiển thị score và nhận xét trong `CandidateDrawer.tsx` | `[FE]` | 1 | Loading/error khi chưa có score |
| T-23-06 | Nút "Chạy lại phân tích" trong Drawer | `[FE]` | 1 | |

---

### STORY-24 · AI gợi ý câu hỏi phỏng vấn

> **Là** HR,
> **Tôi muốn** AI gợi ý câu hỏi phỏng vấn dựa trên CV và JD của ứng viên,
> **Để** chuẩn bị tốt hơn cho buổi phỏng vấn.

**Ưu tiên:** 🟡 Should · **SP:** 3

**Tasks:**

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-24-01 | API `POST /api/applications/{id}/ai-suggestions` | `[BE]` `[AI]` | 2 | Trả về: câu hỏi PV, điểm mạnh/yếu |
| T-24-02 | Kết nối `AISuggestionsModal.tsx` với API | `[FE]` | 1 | Thay mock data |

---

---

## 🛠 INFRA · Setup & Foundation Tasks

> Các task kỹ thuật nền tảng không gắn với story cụ thể

| ID | Task | Tag | SP | Ghi chú |
|---|---|---|---|---|
| T-INF-01 | Setup project Spring Boot với Spring Security + JWT | `[BE]` | 3 | |
| T-INF-02 | Cấu hình CORS cho FE domain | `[BE]` | 1 | |
| T-INF-03 | Setup Swagger/OpenAPI documentation | `[BE]` | 1 | |
| T-INF-04 | Tạo toàn bộ DB schema theo database design (Flyway migration) | `[DB]` | 3 | |
| T-INF-05 | Seed dữ liệu demo (Admin, 2 DN, 5 job, ứng viên, email templates) | `[DB]` | 2 | |
| T-INF-06 | Setup Mailtrap SMTP cho môi trường dev | `[INFRA]` | 1 | |
| T-INF-07 | Setup Python FastAPI project cho AI Agent | `[AI]` `[INFRA]` | 2 | |
| T-INF-08 | Thêm Google Fonts (Inter) vào `index.html` | `[FE]` | 1 | Hiện tại chỉ khai báo CSS chưa load |
| T-INF-09 | Thống nhất màu primary: chọn `#47b1de` hoặc `#0052cc`, cập nhật toàn bộ | `[FE]` | 1 | |
| T-INF-10 | Setup Axios instance với JWT interceptor (auto attach + handle 401) | `[FE]` | 2 | |
| T-INF-11 | Đăng ký route `/dashboard/career-site` và `/dashboard/notifications` | `[FE]` | 1 | |
| T-INF-12 | Thêm `Inbox` vào Sidebar nav (route `/dashboard/inbox`) | `[FE]` | 1 | |
| T-INF-13 | Docker Compose: FE + BE + DB + Redis | `[INFRA]` | 2 | |
| T-INF-14 | README: hướng dẫn setup và chạy local | `[INFRA]` | 1 | |

---

---

## 📊 Tổng hợp Story Points

| Epic | Must | Should | Tổng SP |
|---|---|---|---|
| EP-01 Auth & Onboarding | ST-01(3) + ST-02(3) + ST-04(1) = 7 | ST-03(2) | **9** |
| EP-02 Admin | ST-05(5) | — | **5** |
| EP-03 Job Management | ST-07(3) + ST-08(5) + ST-09(2) + ST-10(2) = 12 | ST-06(3) | **15** |
| EP-04 Pipeline & Automation | ST-11(5) + ST-12(5) = 10 | ST-13(3) | **13** |
| EP-05 Candidates | ST-15(3) + ST-16(5) = 8 | ST-14(5) | **13** |
| EP-06 Career Site | ST-17(3) + ST-18(5) = 8 | ST-19(3) | **11** |
| EP-07 Settings | ST-20(3) | ST-21(2) + ST-22(3) = 5 | **8** |
| EP-08 AI Features | — | ST-23(5) + ST-24(3) = 8 | **8** |
| INFRA | — | — | **18** |
| **TỔNG** | | | **~100 SP** |

---

## 👥 Gợi ý phân công

> Giả sử team 4 người: 2 BE Dev, 1 FE Dev, 1 Full-stack/AI Dev

| Vai trò | Phụ trách chính | Ưu tiên Sprint 1 |
|---|---|---|
| **BE Dev 1** | Auth, Business, Job CRUD, Admin API | T-01-01~02, T-05-01~05, T-07-01~03, T-INF-01~04 |
| **BE Dev 2** | Application, Email, Interview | T-12-01~06, T-13-01~02, T-18-03~05, T-20-01~02 |
| **FE Dev** | Auth context, Guard, Job/Kanban/Settings UI | T-01-03~07, T-08-04~08, T-14-02~05, T-20-03~05, T-INF-08~12 |
| **AI/Full-stack** | AI Agent JD Writer, CV Scoring, Python service | T-08-02~03, T-23-02~04, T-24-01, T-INF-07 |

---

## 📅 Gợi ý Sprint Planning (3 sprint × 2 tuần)

### 🏃 Sprint 1 — Nền tảng
**Mục tiêu:** Login được, Admin duyệt được, Tạo/xem job được (API thật)

- ST-01, ST-02, ST-04 — Auth flow đầy đủ (BE + FE)
- ST-05 — Admin Dashboard kết nối API
- ST-07, ST-09 — Jobs List + JobDetail API
- INFRA — DB schema, seed data, Swagger, Axios setup

### 🏃 Sprint 2 — Core Flow
**Mục tiêu:** Tạo pipeline, publish job, ứng viên nộp CV, HR Pass/Fail được

- ST-08 — JobCreateWizard + AI JD Writer thật
- ST-10, ST-11 — Publish + RoundsConfig API
- ST-12 — Email Automation (Pass/Fail trigger)
- ST-17, ST-18 — Career Site + Apply Form
- ST-15, ST-16 — CandidatesList + CandidateDrawer

### 🏃 Sprint 3 — Polish & AI
**Mục tiêu:** Dashboard stats, Settings hoàn chỉnh, AI Scoring, demo-ready

- ST-06 — Dashboard charts real data
- ST-20, ST-21, ST-22 — Settings tabs hoàn chỉnh
- ST-23, ST-24 — CV Scoring + AI Suggestions
- ST-13, ST-14, ST-19 — Interview Scheduler, Kanban D&D, Interview Response
- INFRA — Docker Compose, README, demo data

---

*Tài liệu này là living document. Mọi thay đổi scope cần cập nhật tại đây trước khi implement.*
