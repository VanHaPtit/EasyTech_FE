# STORY-10 · HR Publish Job ra Career Site

> **Epic:** [EP-03](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 2 · **Sprint:** Sprint 2

---

## User Story

> **Là** HR,
> **Tôi muốn** publish tin tuyển dụng ra Career Site sau khi đã cấu hình pipeline,
> **Để** ứng viên có thể xem và nộp CV.

---

## Luồng chi tiết

```
HR bấm [Publish] trong JobDetail
→ Mở PublishJobModal
→ PUT /api/jobs/{id}/publish
→ BE validate: job phải có ít nhất 1 vòng tuyển dụng
   - Nếu chưa có vòng → 400 "Cần cấu hình pipeline trước"
   - Nếu OK → job.status = ACTIVE, publishedAt = now()
→ FE: Hiệu ứng confetti 🎉
→ Redirect hoặc reload page
```

---

## Definition of Done

- [ ] Publish thành công → `job.status = ACTIVE`
- [ ] Job hiển thị trên Career Site của DN
- [ ] Nếu chưa có vòng → hiển thị lỗi, không cho publish

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-10-01](./T-10-01_API_Publish.md) | API `PUT /api/jobs/{id}/publish` | `[BE]` | 2 |
| [T-10-02](./T-10-02_Publish_Modal_FE.md) | Kết nối PublishJobModal với API | `[FE]` | 1 |
| [T-10-03](./T-10-03_Confetti.md) | Hiệu ứng confetti sau publish | `[FE]` | 1 |
