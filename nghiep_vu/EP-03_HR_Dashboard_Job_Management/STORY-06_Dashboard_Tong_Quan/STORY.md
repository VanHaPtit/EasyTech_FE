# STORY-06 · HR xem Dashboard tổng quan tuyển dụng

> **Epic:** [EP-03](../EPIC.md)
> **Ưu tiên:** 🟡 Should · **SP:** 3 · **Sprint:** Sprint 3

---

## User Story

> **Là** HR,
> **Tôi muốn** xem Dashboard tổng quan với thống kê và biểu đồ xu hướng ứng viên,
> **Để** nắm bắt nhanh tình hình tuyển dụng của công ty.

---

## Luồng chi tiết

```
HR vào /dashboard
→ Parallel fetch:
  GET /api/dashboard/stats      → 4 thẻ thống kê
  GET /api/dashboard/chart?months=6  → data biểu đồ
  GET /api/dashboard/top-jobs?limit=5 → top job nhiều ứng viên
→ Render:
  - 4 thẻ: Tổng ứng viên | Đang xử lý | Đạt | Không đạt
  - Biểu đồ cột theo tháng (6 tháng gần nhất)
  - Table top 5 jobs nhiều ứng viên
```

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-06-01](./T-06-01_API_Stats.md) | API `GET /api/dashboard/stats` | `[BE]` | 2 |
| [T-06-02](./T-06-02_API_Chart.md) | API `GET /api/dashboard/chart` | `[BE]` | 2 |
| [T-06-03](./T-06-03_API_Top_Jobs.md) | API `GET /api/dashboard/top-jobs` | `[BE]` | 1 |
| [T-06-04](./T-06-04_Dashboard_FE.md) | Kết nối Dashboard.tsx với 3 API | `[FE]` | 3 |
| [T-06-05](./T-06-05_Chart_Component.md) | Vẽ biểu đồ cột với Recharts | `[FE]` | 2 |
