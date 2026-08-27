# STORY-09 · HR xem và chỉnh sửa Chi tiết Job

> **Epic:** [EP-03](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 2 · **Sprint:** Sprint 1

---

## User Story

> **Là** HR,
> **Tôi muốn** xem đầy đủ thông tin một tin tuyển dụng và chỉnh sửa khi cần,
> **Để** cập nhật nội dung trước khi publish.

---

## Luồng chi tiết

```
HR click vào job từ danh sách
→ /dashboard/jobs/{id}
→ GET /api/jobs/{id} → render chi tiết

HR muốn chỉnh sửa:
→ Bấm [Chỉnh sửa] → mở EditJobModal
→ Sửa xong → PUT /api/jobs/{id}
→ Reload trang với data mới
```

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-09-01](./T-09-01_API_Get_Job.md) | API `GET /api/jobs/{id}` | `[BE]` | 1 |
| [T-09-02](./T-09-02_API_Update_Job.md) | API `PUT /api/jobs/{id}` | `[BE]` | 1 |
| [T-09-03](./T-09-03_JobDetail_FE.md) | Kết nối JobDetail.tsx với API | `[FE]` | 2 |
| [T-09-04](./T-09-04_EditJobModal.md) | Kết nối EditJobModal với API update | `[FE]` | 1 |
