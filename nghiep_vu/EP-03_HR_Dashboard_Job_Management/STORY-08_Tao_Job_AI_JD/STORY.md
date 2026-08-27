# STORY-08 · HR tạo Tin tuyển dụng mới với AI JD Writer

> **Epic:** [EP-03](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 5 · **Sprint:** Sprint 2

---

## User Story

> **Là** HR,
> **Tôi muốn** tạo tin tuyển dụng mới qua wizard 3 panel (Form + AI JD + Preview),
> **Để** nhanh chóng có Job Description chuyên nghiệp với sự hỗ trợ của AI.

---

## Luồng chi tiết

```
Panel 1 — Form thông tin job:
  HR nhập: Tên vị trí, Danh mục, Địa điểm, Mức lương, Loại hợp đồng, Cấp độ
  → [Lưu nháp] → POST /api/jobs → nhận job.id
  → [Tiếp theo →] sang Panel 2

Panel 2 — AI JD Writer:
  HR nhập prompt mô tả thêm (optional)
  → [Tạo JD với AI] → POST /api/ai/jd-writer { jobId, additionalContext }
  → Stream SSE response → hiển thị Markdown theo thời gian thực
  → HR có thể edit kết quả trong textarea
  → [Áp dụng] → auto-fill description vào Panel 1 form

Panel 3 — Preview:
  Hiển thị live preview của JD dạng Markdown render
  → [Publish] → PUT /api/jobs/{id}/publish
  → Redirect sang /dashboard/jobs/{id}/rounds
```

---

## Definition of Done

- [ ] Form nhập thông tin job hoạt động với validation đầy đủ
- [ ] AI JD Generator gọi API thật và stream trả về Markdown
- [ ] Live Preview render đúng Markdown
- [ ] Lưu nháp thành công → tạo record trong DB với job ID thật
- [ ] Redirect đến `/dashboard/jobs/{realId}/rounds` (không hardcode)

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-08-01](./T-08-01_API_Create_Job.md) | API `POST /api/jobs` tạo job mới | `[BE]` | 2 |
| [T-08-02](./T-08-02_API_JD_Writer_Proxy.md) | API `POST /api/ai/jd-writer` proxy | `[BE]` | 3 |
| [T-08-03](./T-08-03_AI_Agent_JD_Writer.md) | AI Agent JD Writer (Python FastAPI) | `[AI]` | 5 |
| [T-08-04](./T-08-04_JobCreate_Panel1.md) | Kết nối Panel 1 form với API tạo job | `[FE]` | 2 |
| [T-08-05](./T-08-05_AI_Panel2.md) | Kết nối Panel 2 với AI JD Writer API | `[FE]` | 2 |
| [T-08-06](./T-08-06_AutoFill.md) | Auto-fill form từ AI response | `[FE]` | 1 |
| [T-08-07](./T-08-07_Markdown_Preview.md) | Render Markdown trong Live Preview | `[FE]` | 1 |
| [T-08-08](./T-08-08_Redirect_Real_ID.md) | Redirect dùng job ID thật | `[FE]` | 1 |
| [T-08-09](./T-08-09_DB_Job_Categories.md) | Tạo bảng `job_categories` và seed | `[DB]` | 1 |
