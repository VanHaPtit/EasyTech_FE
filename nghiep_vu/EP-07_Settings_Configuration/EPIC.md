# EP-07 · Settings & Configuration

> **Epic ID:** EP-07
> **Ưu tiên:** 🟡 Should
> **Tổng SP:** 8
> **Sprint:** Sprint 3

---

## Mục tiêu

Cho phép HR quản lý toàn bộ cấu hình của tài khoản doanh nghiệp: thông tin công ty, email templates, và cài đặt AI provider (API key).

---

## Phạm vi

### In Scope
- Cập nhật thông tin doanh nghiệp (tên, địa chỉ, website, phone, logo)
- CRUD Email Templates (Pass, Fail, Mời PV, Cảm ơn)
- Rich text editor cho nội dung email (hỗ trợ biến `{{variable}}`)
- Preview email sau khi thay biến
- Cấu hình AI Provider (chọn provider, nhập API key được mã hóa)

### Out of Scope
- Custom domain cho Career Site (Phase 2)
- Notification preferences (Phase 2)
- Team member management (Phase 2)

---

## Actors

| Actor | Mô tả |
|-------|-------|
| **HR** | Người quản lý cài đặt doanh nghiệp |

---

## Technical Impact

| Layer | Ảnh hưởng |
|-------|-----------|
| **FE** | `Settings.tsx` (multi-tab), `ApiKeyModal.tsx`, TipTap/Quill editor |
| **BE** | `SettingsController`, `EmailTemplateService`, `AIProviderService` |
| **DB** | Bảng `email_templates`, `ai_provider_configs` |

---

## Danh sách Stories

| Story | Tên | Ưu tiên | SP |
|-------|-----|---------|-----|
| [STORY-20](./STORY-20_Email_Templates/STORY.md) | HR quản lý Email Templates | 🔴 Must | 3 |
| [STORY-21](./STORY-21_Thong_Tin_DN/STORY.md) | HR cập nhật thông tin doanh nghiệp | 🟡 Should | 2 |
| [STORY-22](./STORY-22_AI_Provider/STORY.md) | HR cấu hình AI Provider & API Key | 🟡 Should | 3 |

---

## Email Template Variables

Các biến hỗ trợ trong email template:
- `{{candidate_name}}` — Tên ứng viên
- `{{job_title}}` — Tên vị trí
- `{{company_name}}` — Tên công ty
- `{{interview_date}}` — Ngày phỏng vấn
- `{{interview_link}}` — Link meeting (nếu online)
- `{{hr_name}}` — Tên HR phụ trách
