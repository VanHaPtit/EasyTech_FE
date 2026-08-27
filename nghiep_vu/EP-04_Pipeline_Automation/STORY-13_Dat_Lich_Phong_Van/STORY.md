# STORY-13 · HR đặt lịch phỏng vấn

> **Epic:** [EP-04](../EPIC.md)
> **Ưu tiên:** 🟡 Should · **SP:** 3 · **Sprint:** Sprint 3

---

## User Story

> **Là** HR,
> **Tôi muốn** đặt lịch phỏng vấn cho ứng viên và hệ thống tự động gửi email mời,
> **Để** ứng viên nhận được lịch phỏng vấn đúng hẹn.

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-13-01](./T-13-01_DB_Interview_Schedules.md) | Tạo bảng `interview_schedules` | `[DB]` | 1 |
| [T-13-02](./T-13-02_API_Create_Interview.md) | API `POST /api/applications/{id}/interview` | `[BE]` | 2 |
| [T-13-03](./T-13-03_Interview_Modal_FE.md) | Kết nối InterviewSchedulerModal với API | `[FE]` | 2 |
| [T-13-04](./T-13-04_Show_Schedule.md) | Hiển thị lịch phỏng vấn trong CandidateDrawer | `[FE]` | 1 |
