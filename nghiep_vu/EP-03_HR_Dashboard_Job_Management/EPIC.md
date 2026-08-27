# EP-03 · HR Dashboard & Job Management

> **Epic ID:** EP-03
> **Ưu tiên:** 🔴 Must
> **Tổng SP:** 15
> **Sprint:** Sprint 1 (STORY-07, 09), Sprint 2 (STORY-08, 10), Sprint 3 (STORY-06)

---

## Mục tiêu

Cho phép HR tạo và quản lý toàn bộ tin tuyển dụng (Job Posts) của doanh nghiệp:
- Xem Dashboard tổng quan với thống kê và biểu đồ
- CRUD job posts với đầy đủ thông tin
- Sử dụng AI để viết Job Description (JD) tự động
- Publish job ra Career Site sau khi cấu hình pipeline

---

## Phạm vi

### In Scope
- Dashboard stats: tổng ứng viên, đang xử lý, đạt/không đạt
- Biểu đồ ứng viên theo tháng (6 tháng gần nhất)
- Top jobs nhiều ứng viên
- Danh sách job với filter/search/pagination
- Tạo job mới với wizard 3 panel (Form + AI JD + Preview)
- AI JD Writer: streaming response từ LLM
- Xem và chỉnh sửa chi tiết job
- Publish job (validate pipeline trước)

### Out of Scope
- Duplicate job (Phase 2)
- Job templates (Phase 2)
- A/B testing JD (Phase 2)

---

## Actors

| Actor | Mô tả |
|-------|-------|
| **HR** | Người dùng chính tạo và quản lý job |
| **AI Agent** | Service Python FastAPI sinh JD tự động |

---

## Technical Impact

| Layer | Ảnh hưởng |
|-------|-----------|
| **FE** | `Dashboard.tsx`, `Jobs.tsx`, `JobCreateWizard.tsx`, `JobDetail.tsx`, `EditJobModal.tsx`, `PublishJobModal.tsx`, Recharts |
| **BE** | `JobController`, `JobService`, `DashboardController`, `AIProxyController` |
| **AI** | Python FastAPI: JD Writer agent, prompt engineering, SSE streaming |
| **DB** | Bảng `job_posts`, `job_categories` |

---

## Danh sách Stories

| Story | Tên | Ưu tiên | SP |
|-------|-----|---------|-----|
| [STORY-06](./STORY-06_Dashboard_Tong_Quan/STORY.md) | HR xem Dashboard tổng quan tuyển dụng | 🟡 Should | 3 |
| [STORY-07](./STORY-07_Xem_Danh_Sach_Job/STORY.md) | HR xem danh sách Tin tuyển dụng | 🔴 Must | 3 |
| [STORY-08](./STORY-08_Tao_Job_AI_JD/STORY.md) | HR tạo Tin tuyển dụng mới với AI JD Writer | 🔴 Must | 5 |
| [STORY-09](./STORY-09_Xem_Chinh_Sua_Job/STORY.md) | HR xem và chỉnh sửa Chi tiết Job | 🔴 Must | 2 |
| [STORY-10](./STORY-10_Publish_Job/STORY.md) | HR Publish Job ra Career Site | 🔴 Must | 2 |

---

## Job Status Flow

```
DRAFT → (cấu hình pipeline) → INACTIVE → (publish) → ACTIVE → (close) → CLOSED
```

- Job tạo mới: mặc định `INACTIVE`
- Publish: validate phải có ít nhất 1 vòng pipeline → chuyển sang `ACTIVE`
- Career Site chỉ hiển thị job `ACTIVE`
