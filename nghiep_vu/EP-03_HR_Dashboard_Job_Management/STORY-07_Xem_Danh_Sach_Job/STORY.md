# STORY-07 · HR xem danh sách Tin tuyển dụng

> **Epic:** [EP-03](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 3 · **Sprint:** Sprint 1

---

## User Story

> **Là** HR,
> **Tôi muốn** xem tất cả tin tuyển dụng của công ty với bộ lọc và sắp xếp,
> **Để** theo dõi và quản lý các vị trí đang tuyển.

---

## Luồng chi tiết

```
HR vào /dashboard/jobs
→ GET /api/jobs/stats        → 4 thẻ thống kê đầu trang
→ GET /api/jobs?page=0&size=10  → Danh sách job

HR có thể:
- Search theo tên job
- Filter theo status: ALL / ACTIVE / INACTIVE / CLOSED
- Click [+ Tạo mới] → /dashboard/jobs/new
- Click vào row → /dashboard/jobs/{id}
```

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-07-01](./T-07-01_DB_Job_Posts.md) | Tạo bảng `job_posts` | `[DB]` | 1 |
| [T-07-02](./T-07-02_API_List_Jobs.md) | API `GET /api/jobs` | `[BE]` | 2 |
| [T-07-03](./T-07-03_API_Job_Stats.md) | API `GET /api/jobs/stats` | `[BE]` | 1 |
| [T-07-04](./T-07-04_Jobs_List_FE.md) | Kết nối Jobs.tsx với API | `[FE]` | 2 |
| [T-07-05](./T-07-05_Stats_Cards.md) | Kết nối 4 thẻ stats với API | `[FE]` | 1 |
