# 📋 Product Backlog — EasyTech Recruitment Platform

> Phiên bản: v1.1 · Cập nhật: 2026-08-30
> Stack FE: React 19 + Vite + TypeScript + TailwindCSS v4
> Stack BE: Spring Boot (Java)
> AI: Python FastAPI Agent

---

## 1. Mục tiêu sản phẩm

EasyTech Recruitment Platform là nền tảng quản lý tuyển dụng SaaS dành cho doanh nghiệp, tập trung vào trải nghiệm người dùng rõ ràng cho 3 đối tượng chính:
- HR / HR_ADMIN
- Candidate
- System Admin

Mục tiêu chính của MVP:
- Cho phép doanh nghiệp đăng ký và được Admin phê duyệt trước khi dùng hệ thống.
- Cho phép HR tạo, quản lý, publish Job và theo dõi ứng viên.
- Cho phép Candidate xem Job và ứng tuyển nhanh mà không cần tài khoản.
- Hỗ trợ pipeline, email automation, AI recommendation nhưng không để AI tự quyết định tuyển dụng.

---

## 2. Luồng nghiệp vụ chuẩn hóa

### HR lifecycle

Đăng ký
→ Company = PENDING, User = PENDING
→ Trang chờ duyệt
→ Admin xem xét
→ Duyệt: Company = ACTIVE, User = ACTIVE
→ Từ chối: Company = REJECTED, User = PENDING (restricted)
→ Gửi lại: Company = PENDING, User = PENDING
→ HR đăng nhập
→ Onboarding (Thiết lập Branding, Lời chào) bằng `onboardingCompleted`
→ Dashboard
→ Tạo Job
→ Pipeline mặc định + form ứng tuyển mặc định + email template mặc định
→ Publish
→ Job status = ACTIVE
→ Candidate ứng tuyển
→ Xem Candidate / chuyển qua các stage
→ Phỏng vấn + phản hồi qua Magic Link

### Candidate lifecycle

Duyệt Career Site
→ Xem chi tiết Job
→ Ứng tuyển không cần tài khoản
→ Upload CV + đồng ý điều khoản + câu hỏi tùy chọn
→ Trang xác nhận + email xác nhận + Magic Link
→ Theo dõi Application Status
→ Phản hồi lịch phỏng vấn qua link email

### Admin lifecycle

Đăng nhập bằng Admin
→ Xem công ty chờ duyệt
→ Duyệt hoặc từ chối
→ Nếu từ chối: gửi lý do, cho phép HR chỉnh sửa + gửi lại
→ Xem Audit Logs và thao tác Admin

---

## 3. Quy ước trạng thái chuẩn

### Company Status
Trạng thái doanh nghiệp trong quá trình đăng ký và sử dụng.

| Status | Ý nghĩa | Khi thay đổi |
|--------|---------|---------|
| `PENDING` | Đã đăng ký, chờ Admin duyệt | Sau đăng ký |
| `ACTIVE` | Được Admin phê duyệt, có quyền sử dụng | Sau Admin approve |
| `REJECTED` | Bị Admin từ chối, có lý do | Sau Admin reject |
| `BLOCKED` | Bị khóa (tùy chọn, dùng trong tương lai) | Admin thao tác thủ công |

### User Status
Trạng thái tài khoản cá nhân, độc lập với Company Status.

| Status | Ý nghĩa | Khi thay đổi |
|--------|---------|---------|
| `PENDING` | Tài khoản tạo, chờ duyệt / onboarding | Sau khi tạo user |
| `ACTIVE` | Được kích hoạt, quyền truy cập bình thường | Sau onboarding hoặc thao tác Admin |
| `INACTIVE` | Bị vô hiệu hóa (Admin disable member) | Admin action |
| `BLOCKED` | Bị khóa / tạm đình chỉ | Admin action |

> **Lưu ý:** `User Status` không dùng để biểu diễn onboarding. Onboarding được quản lý bằng `onboardingCompleted = true/false`.

### Job Status
| Status | Ý nghĩa | Khi thay đổi |
|--------|---------|---------|
| `DRAFT` | Nháp, chưa publish | Khi tạo job mới |
| `ACTIVE` | Đã publish, đang nhận hồ sơ | HR click Publish |
| `CLOSED` | Tạm dừng nhận hồ sơ | HR click Close |

### Application Status (Hồ sơ ứng viên)
Phản ánh trạng thái tổng thể của hồ sơ tuyển dụng. **Không** phải Pipeline Stage hay Round Result.

| Status | Ý nghĩa | Khi thay đổi |
|--------|---------|---------|
| `ACTIVE` | Hồ sơ đang được xem xét | Candidate ứng tuyển |
| `REJECTED` | Hồ sơ bị từ chối | Hành động từ chối rõ ràng hoặc rule nghiệp vụ yêu cầu từ chối sau vòng thất bại |
| `HIRED` | Hồ sơ được tuyển | HR thực hiện hành động `Hire` rõ ràng |

> **Quy tắc quan trọng:** `PASSED` là `Round Result`, không phải `Application Status`. Final round `PASSED` không tự động tạo `HIRED`. Trong MVP, ứng viên chỉ chuyển sang vòng tiếp theo, Offer hoặc Final Decision; `HIRED` chỉ xảy ra khi HR thực hiện hành động `Hire` rõ ràng.

### Pipeline Stage
Thể hiện ứng viên đang ở bước nào trong quy trình tuyển dụng. **Được cấu hình động theo từng Job**.
- Ví dụ: Application Received, CV Screening, Technical Interview, HR Interview, Offer
- **Không** dùng APPLIED, SCREENING, INTERVIEW làm Application Status nếu chúng là stage.

### Round Result (Kết quả đánh giá một vòng)
| Result | Ý nghĩa | Khi thay đổi |
|--------|---------|---------|
| `IN_PROGRESS` | Vòng này chưa kết thúc | Candidate vào stage |
| `PASSED` | Vòng này đạt, ứng viên tiếp tục | HR đánh giá = pass |
| `FAILED` | Vòng này không đạt | HR đánh giá = fail |

> Lưu ý: Không dùng `Unpublish` trong MVP. Khi cần dừng nhận hồ sơ, dùng Close/Closed. `ACTIVE` = Published.
> 
> **Phân biệt rõ:**
> - Company Status: trạng thái công ty
> - User Status: trạng thái account cá nhân (độc lập với Company)
> - Application Status: trạng thái tổng thể hồ sơ
> - Pipeline Stage: vị trí hiện tại trong pipeline (không phải status)
> - Round Result: kết quả một vòng cụ thể (không phải Application Status)

---

## 4. Quy ước ký hiệu

| Ký hiệu | Ý nghĩa |
|----------|---------|
| 🔴 Must | Bắt buộc làm — MVP |
| 🟡 Should | Nên làm nếu kịp |
| 🟢 Could | Mở rộng sau |
| `[FE]` | Frontend |
| `[BE]` | Backend |
| `[AI]` | AI / agent |
| `[DB]` | Database / schema |
| `[INFRA]` | Infrastructure |
| SP | Story point |
| Future Enhancement | Tính năng mở rộng sau MVP |
| NEEDS PRODUCT DECISION | Cần xác nhận bởi Product Owner |

---

## 5. Danh sách Epic

| # | Epic | Ưu tiên | SP | Mô tả |
|---|------|---------|-----|-------|
| [EP-01](./epic-01_Authentication_Onboarding/brief.md) | Authentication & Onboarding | 🔴 Must | 9 | Đăng ký, duyệt, đăng nhập, onboarding |
| [EP-02](./epic-02_Admin_Area/brief.md) | Admin Area | 🔴 Must | 8 | Admin xem xét company, audit log và admin job categories |
| [EP-03](./epic-03_HR_Dashboard_Job_Management/brief.md) | HR Dashboard & Job Management | 🔴 Must | 15 | Dashboard, CRUD Job, AI JD writer, publish |
| [EP-04](./epic-04_Pipeline_Automation/brief.md) | Pipeline & Automation | 🔴 Must | 13 | Hiring stages, email automation, interview scheduling |
| [EP-05](./epic-05_Candidate_Application_Management/brief.md) | Candidate & Application Management | 🔴 Must | 13 | Kanban, list, candidate drawer |
| [EP-06](./epic-06_Career_Site/brief.md) | Career Site (Public) | 🔴 Must | 11 | Job listing và apply form |
| [EP-07](./epic-07_Settings_Configuration/brief.md) | Settings & Configuration | 🟡 Should | 8 | Company settings, email templates, AI provider, HR permissions |
| [EP-08](./epic-08_AI_Features/brief.md) | AI Features | 🟡 Should | 8 | CV scoring và AI suggestions |
| [INFRA](./INFRA/) | Infrastructure & Foundation | — | 18 | Setup kỹ thuật nền tảng |

---

## 6. Tổng hợp Story Points

| Epic | Must SP | Should SP | Tổng SP |
|------|---------|-----------|---------|
| EP-01 Auth & Onboarding | 9 | — | **9** |
| EP-02 Admin | 5 | 3 | **8** |
| EP-03 Job Management | 15 | 3 | **18** |
| EP-04 Pipeline & Automation | 13 | 5 | **18** |
| EP-05 Candidates | 11 | 5 | **16** |
| EP-06 Career Site | 12 | 3 | **15** |
| EP-07 Settings | 3 | 5 | **8** |
| EP-08 AI Features | — | 8 | **8** |
| INFRA | — | — | **18** |
| **TỔNG** | | | **~115 SP** |

---

## 7. Sprint planning (chuẩn hóa)

### Sprint 1 — Foundation & Access
Mục tiêu: HR có thể đăng ký, hệ thống admin duyệt, HR đăng nhập, onboarding cơ bản, và Job list hoạt động.
- EP-01: US-01, US-02, US-03, US-04
- EP-02: US-05, US-30
- EP-03: US-06, US-07, US-09
- INFRA: DB schema, auth, routes, seed data

### Sprint 2 — Core Recruitment Flow
Mục tiêu: Job publish, ứng tuyển, review Candidate và pipeline hoạt động end-to-end.
- EP-03: US-08, US-10, US-25
- EP-04: US-11, US-12, US-13, US-27
- EP-05: US-14, US-15, US-16
- EP-06: US-17, US-18, US-28

### Sprint 3 — Polish, AI, Settings
Mục tiêu: Tối ưu UX, AI recommendation, email template, feedback và demo-ready.
- EP-03: US-06 (dashboard polish), US-09 (edit flow)
- EP-04: US-26, US-36
- EP-06: US-29
- EP-07: US-20, US-21, US-22, US-33, US-35
- EP-08: US-23, US-24, US-34

---

## 8. Cải tiến trong tương lai và quyết định sản phẩm

Các item dưới đây không nằm trong MVP và phải được đánh dấu rõ ràng:
- Google OAuth là phương thức đăng nhập bổ sung tùy chọn
- AI BYOK / cấu hình provider bởi HR
- AI tự gợi ý hoặc tự chấm điểm khi chưa có HR review
- Tùy biến nâng cao thứ tự vòng, thư viện câu hỏi và branding multi-tenant
- Luồng đổi lịch tùy chỉnh cho phản hồi phỏng vấn
- Notification center nâng cao và audit automation đầy đủ

Các điểm cần Product Owner xác nhận:
- SLA duyệt Company sau khi đăng ký

Các quyết định sản phẩm (Đã chốt):
- Thời hạn Magic Link: 30 ngày (Hết hạn yêu cầu gửi lại).
- Candidate ĐƯỢC PHÉP đề xuất đổi lịch phỏng vấn (tối đa 1 lần).
- Storage: Sử dụng AWS S3 làm nơi lưu trữ CV, Portfolio của ứng viên.
- AI Features: Sử dụng ChatGPT hoặc Gemini làm AI Provider (Chi phí API do hệ thống chi trả trong MVP).
- Bảo mật Magic Link: Bắt buộc ứng viên nhập lại Email ứng tuyển để verify.

> Tài liệu này là tài liệu sống. Mọi thay đổi scope cần cập nhật tại đây trước khi triển khai.
