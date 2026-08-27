# EP-05 · Candidate & Application Management

> **Epic ID:** EP-05
> **Ưu tiên:** 🔴 Must
> **Tổng SP:** 13
> **Sprint:** Sprint 2 (STORY-15, 16), Sprint 3 (STORY-14)

---

## Mục tiêu

Cung cấp cho HR giao diện toàn diện để quản lý ứng viên đã nộp CV — xem theo Kanban board hoặc List/Table view, xem chi tiết hồ sơ, CV, AI score và đánh giá Pass/Fail ngay trong drawer.

---

## Phạm vi

### In Scope
- Kanban board với 4 cột: Mới / Đang xử lý / Đạt / Không đạt
- Drag & drop card giữa các cột (trigger evaluate API)
- List/Table view với pagination server-side
- Filter theo job và status
- CandidateDrawer: thông tin cá nhân, CV link, lịch sử vòng, AI score, email history
- Pass/Fail buttons trong Drawer

### Out of Scope
- Bulk action (Phase 2)
- Export candidates to CSV (Phase 2)
- Candidate profile merge detection (Phase 2)

---

## Actors

| Actor | Mô tả |
|-------|-------|
| **HR** | Xem, filter, đánh giá ứng viên |

---

## Technical Impact

| Layer | Ảnh hưởng |
|-------|-----------|
| **FE** | `Kanban.tsx`, `CandidatesList.tsx`, `CandidateDrawer.tsx`, `@dnd-kit/core` |
| **BE** | `ApplicationController`, `ApplicationService` |
| **DB** | Bảng `applications`, `candidates`, `application_round_statuses`, `cv_analyses`, `email_logs` |

---

## Danh sách Stories

| Story | Tên | Ưu tiên | SP |
|-------|-----|---------|-----|
| [STORY-14](./STORY-14_Kanban_Board/STORY.md) | HR xem danh sách ứng viên — Kanban Board | 🟡 Should | 5 |
| [STORY-15](./STORY-15_List_View/STORY.md) | HR xem danh sách ứng viên — List/Table view | 🔴 Must | 3 |
| [STORY-16](./STORY-16_Candidate_Drawer/STORY.md) | HR xem chi tiết và đánh giá ứng viên (CandidateDrawer) | 🔴 Must | 5 |

---

## Application Status Flow

```
NEW → (HR review) → IN_PROGRESS
IN_PROGRESS → (Pass vòng cuối) → PASSED
IN_PROGRESS → (Fail bất kỳ vòng) → REJECTED
```

Kanban columns map to status:
- **Mới** → `NEW`
- **Đang xử lý** → `IN_PROGRESS`
- **Đạt** → `PASSED`
- **Không đạt** → `REJECTED`
