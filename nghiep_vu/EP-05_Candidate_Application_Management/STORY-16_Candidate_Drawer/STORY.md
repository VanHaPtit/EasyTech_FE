# STORY-16 · HR xem chi tiết và đánh giá ứng viên (CandidateDrawer)

> **Epic:** [EP-05](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 5 · **Sprint:** Sprint 2

---

## User Story

> **Là** HR,
> **Tôi muốn** xem chi tiết một ứng viên (thông tin, CV, AI score, lịch sử vòng) trong drawer bên phải,
> **Để** đánh giá và quyết định Pass/Fail.

---

## UI Structure

```
CandidateDrawer (slide-in từ phải, width 500px)
├── Header: Avatar + Tên + Email + AI Score badge
├── Tabs:
│   ├── [Tổng quan] → Thông tin cá nhân + CV link/download
│   ├── [Timeline] → Lịch sử vòng + lịch phỏng vấn
│   ├── [AI Analysis] → Điểm số + điểm mạnh/yếu
│   └── [Email History] → Danh sách email đã gửi
└── Footer: Vòng hiện tại + [Pass] [Fail] [Đặt lịch PV]
```

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-16-01](./T-16-01_API_App_Detail.md) | API `GET /api/applications/{id}` chi tiết | `[BE]` | 2 |
| [T-16-02](./T-16-02_Drawer_FE.md) | Kết nối CandidateDrawer.tsx với API | `[FE]` | 3 |
| [T-16-03](./T-16-03_CV_Link.md) | Hiển thị CV link/download | `[FE]` | 1 |
| [T-16-04](./T-16-04_Timeline.md) | Hiển thị lịch sử vòng (timeline) | `[FE]` | 1 |
| [T-16-05](./T-16-05_AI_Score.md) | Hiển thị AI Matching Score | `[FE]` | 1 |
| [T-16-06](./T-16-06_Email_History.md) | Hiển thị lịch sử email đã gửi | `[FE]` | 1 |
