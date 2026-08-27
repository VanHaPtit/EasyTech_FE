# 📋 Product Backlog — EasyTech Recruitment Platform

> **Phiên bản:** v1.0 · **Cập nhật:** 2026-08-27
> **Stack FE:** React 19 + Vite + TypeScript + TailwindCSS v4
> **Stack BE:** Spring Boot (Java) · **AI:** Python FastAPI Agent

---

## Tổng quan hệ thống

**EasyTech Recruitment Platform** là nền tảng quản lý tuyển dụng SaaS dành cho doanh nghiệp (HR), cho phép:
- HR đăng ký, quản lý tin tuyển dụng, pipeline vòng phỏng vấn
- Ứng viên nộp CV qua Career Site công khai
- AI hỗ trợ viết JD và chấm điểm CV tự động
- Admin EasyTech kiểm duyệt doanh nghiệp trước khi kích hoạt

---

## Quy ước ký hiệu

| Ký hiệu | Ý nghĩa |
|----------|---------|
| 🔴 Must | Bắt buộc làm — MVP |
| 🟡 Should | Nên làm nếu kịp |
| 🟢 Could | Mở rộng sau |
| `[FE]` | Task Frontend (React/Vite/TS) |
| `[BE]` | Task Backend (Spring Boot) |
| `[AI]` | Task AI/Agent (Python FastAPI) |
| `[DB]` | Task Database/Schema (PostgreSQL) |
| `[INFRA]` | Task DevOps/Config |
| SP | Story Points: 1=nhỏ, 2=trung bình, 3=lớn, 5=rất lớn |

---

## Danh sách Epic

| # | Epic | Ưu tiên | SP | Mô tả |
|---|------|---------|-----|-------|
| [EP-01](./EP-01_Authentication_Onboarding/EPIC.md) | Authentication & Onboarding | 🔴 Must | 9 | Đăng nhập, đăng ký, phân quyền HR/Admin |
| [EP-02](./EP-02_Admin_Area/EPIC.md) | Admin Area | 🔴 Must | 5 | Admin kiểm duyệt doanh nghiệp |
| [EP-03](./EP-03_HR_Dashboard_Job_Management/EPIC.md) | HR Dashboard & Job Management | 🔴 Must | 15 | CRUD job, AI JD Writer, publish |
| [EP-04](./EP-04_Pipeline_Automation/EPIC.md) | Pipeline & Automation | 🔴 Must | 13 | Vòng tuyển dụng, email tự động, Pass/Fail |
| [EP-05](./EP-05_Candidate_Application_Management/EPIC.md) | Candidate & Application Management | 🔴 Must | 13 | Kanban, List view, CandidateDrawer |
| [EP-06](./EP-06_Career_Site/EPIC.md) | Career Site (Public) | 🔴 Must | 11 | Trang công khai cho ứng viên nộp CV |
| [EP-07](./EP-07_Settings_Configuration/EPIC.md) | Settings & Configuration | 🟡 Should | 8 | Thông tin DN, Email Template, AI Provider |
| [EP-08](./EP-08_AI_Features/EPIC.md) | AI Features | 🟡 Should | 8 | CV Scoring, AI Suggestions, AI JD Writer |
| [INFRA](./INFRA/) | Infrastructure & Foundation | — | 18 | Setup kỹ thuật nền tảng |

---

## Tổng hợp Story Points

| Epic | Must SP | Should SP | Tổng SP |
|------|---------|-----------|---------|
| EP-01 Auth & Onboarding | 7 | 2 | **9** |
| EP-02 Admin | 5 | — | **5** |
| EP-03 Job Management | 12 | 3 | **15** |
| EP-04 Pipeline & Automation | 10 | 3 | **13** |
| EP-05 Candidates | 8 | 5 | **13** |
| EP-06 Career Site | 8 | 3 | **11** |
| EP-07 Settings | 3 | 5 | **8** |
| EP-08 AI Features | — | 8 | **8** |
| INFRA | — | — | **18** |
| **TỔNG** | | | **~100 SP** |

---

## Sprint Planning (3 sprint × 2 tuần)

### Sprint 1 — Nền tảng
**Mục tiêu:** Login được, Admin duyệt được, Tạo/xem job được (API thật)
- EP-01: STORY-01, 02, 04
- EP-02: STORY-05
- EP-03: STORY-07, 09
- INFRA: DB schema, seed, Swagger, Axios

### Sprint 2 — Core Flow
**Mục tiêu:** Tạo pipeline, publish job, ứng viên nộp CV, HR Pass/Fail được
- EP-03: STORY-08, 10
- EP-04: STORY-11, 12
- EP-06: STORY-17, 18
- EP-05: STORY-15, 16

### Sprint 3 — Polish & AI
**Mục tiêu:** Dashboard stats, Settings hoàn chỉnh, AI Scoring, demo-ready
- EP-03: STORY-06
- EP-07: STORY-20, 21, 22
- EP-08: STORY-23, 24
- EP-04: STORY-13, EP-05: STORY-14, EP-06: STORY-19

---
*Tài liệu này là living document. Mọi thay đổi scope cần cập nhật tại đây trước khi implement.*
