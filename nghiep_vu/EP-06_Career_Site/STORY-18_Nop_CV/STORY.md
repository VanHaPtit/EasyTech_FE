# STORY-18 · Ứng viên xem chi tiết và nộp CV

> **Epic:** [EP-06](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 5 · **Sprint:** Sprint 2

---

## User Story

> **Là** Ứng viên (không đăng nhập),
> **Tôi muốn** xem đầy đủ thông tin job và điền form nộp CV,
> **Để** ứng tuyển vào vị trí mình quan tâm.

---

## Luồng chi tiết

```
Ứng viên click vào job card từ Career Site
→ /careers/{companySlug}/{jobSlug}
→ GET /api/public/jobs/{slug} → hiển thị JD đầy đủ

Bấm [Ứng tuyển ngay]
→ Form modal: Họ tên, Email, SĐT, Upload CV (PDF/DOCX ≤ 5MB)
→ Submit → POST /api/public/jobs/{slug}/apply
→ BE: Tạo Candidate + Application + upload CV + gửi email xác nhận
→ FE: Hiển thị màn hình "Nộp hồ sơ thành công"
```

---

## Definition of Done

- [ ] Form nộp CV hoạt động với validation
- [ ] Upload file CV (PDF/DOCX, tối đa 5MB)
- [ ] Tạo Candidate + Application trong DB
- [ ] Gửi email xác nhận tự động cho ứng viên
- [ ] HR thấy application mới trong Dashboard

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-18-01](./T-18-01_API_Job_Public.md) | API `GET /api/public/jobs/{slug}` | `[BE]` | 1 |
| [T-18-02](./T-18-02_DB_Candidates.md) | Tạo bảng `candidates` và `applications` | `[DB]` | 1 |
| [T-18-03](./T-18-03_API_Apply.md) | API `POST /api/public/jobs/{slug}/apply` | `[BE]` | 3 |
| [T-18-04](./T-18-04_File_Upload.md) | Upload CV lên storage | `[BE]` | 2 |
| [T-18-05](./T-18-05_Confirm_Email.md) | Gửi email xác nhận cho ứng viên | `[BE]` | 1 |
| [T-18-06](./T-18-06_Job_Detail_FE.md) | Kết nối CareerJobDetail với API | `[FE]` | 1 |
| [T-18-07](./T-18-07_Apply_Form_FE.md) | Kết nối CareerApplyForm với API | `[FE]` | 2 |
