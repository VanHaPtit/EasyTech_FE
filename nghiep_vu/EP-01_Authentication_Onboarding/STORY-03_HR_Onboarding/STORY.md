# STORY-03 · HR Onboarding hồ sơ doanh nghiệp

> **Epic:** [EP-01](../EPIC.md)
> **Ưu tiên:** 🟡 Should · **SP:** 2 · **Sprint:** Sprint 3

---

## User Story

> **Là** HR đã được Admin duyệt,
> **Tôi muốn** cập nhật đầy đủ hồ sơ công ty (logo, địa chỉ, website, mô tả),
> **Để** Career Site hiển thị thông tin chính xác và chuyên nghiệp.

---

## Luồng chi tiết

```
HR lần đầu đăng nhập sau khi được duyệt
→ Redirect sang /onboarding (hoặc hiển thị banner trong Settings)
→ HR upload logo, điền mô tả, website
→ Submit → PUT /api/businesses/{id}/profile
→ Redirect → /dashboard
```

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-03-01](./T-03-01_API_Update_Profile.md) | API `PUT /api/businesses/{id}/profile` | `[BE]` | 1 |
| [T-03-02](./T-03-02_API_Upload_Logo.md) | API `POST /api/businesses/{id}/logo` upload logo | `[BE]` | 2 |
| [T-03-03](./T-03-03_Onboarding_Page.md) | Kết nối `OnboardingPage.tsx` với API | `[FE]` | 2 |
| [T-03-04](./T-03-04_DB_Business_Profiles.md) | Tạo bảng `business_profiles` | `[DB]` | 1 |
