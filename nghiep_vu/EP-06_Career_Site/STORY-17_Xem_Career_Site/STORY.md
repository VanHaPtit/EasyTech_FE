# STORY-17 · Ứng viên xem Career Site của doanh nghiệp

> **Epic:** [EP-06](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 3 · **Sprint:** Sprint 2

---

## User Story

> **Là** Ứng viên (không đăng nhập),
> **Tôi muốn** xem trang tuyển dụng của công ty với danh sách job đang mở,
> **Để** tìm hiểu và ứng tuyển vào vị trí phù hợp.

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-17-01](./T-17-01_API_Company_Public.md) | API `GET /api/public/companies/{slug}` | `[BE]` | 1 |
| [T-17-02](./T-17-02_API_Public_Jobs.md) | API `GET /api/public/companies/{slug}/jobs` | `[BE]` | 1 |
| [T-17-03](./T-17-03_Career_Site_FE.md) | Kết nối CompanyCareerSitePage với API | `[FE]` | 2 |
| [T-17-04](./T-17-04_DB_Career_Site.md) | Tạo bảng `career_site_settings` | `[DB]` | 1 |
| [T-17-05](./T-17-05_Career_Home_FE.md) | Kết nối CareerHome với API | `[FE]` | 2 |
