# EP-06 · Career Site (Public)

> **Epic ID:** EP-06
> **Ưu tiên:** 🔴 Must
> **Tổng SP:** 11
> **Sprint:** Sprint 2 (STORY-17, 18), Sprint 3 (STORY-19)

---

## Mục tiêu

Tạo trang Career Site công khai cho mỗi doanh nghiệp, nơi ứng viên có thể duyệt job và nộp CV mà không cần đăng nhập. Đây là điểm tiếp xúc chính giữa doanh nghiệp và ứng viên bên ngoài.

---

## Phạm vi

### In Scope
- Career Site riêng theo slug doanh nghiệp (`/careers/{slug}`)
- Trang tổng hợp tất cả job từ mọi DN (`/careers`)
- Xem chi tiết job và form nộp CV (upload file)
- Gửi email xác nhận sau khi nộp CV thành công
- Ứng viên phản hồi lịch phỏng vấn qua link email (token-based)

### Out of Scope
- Ứng viên tạo profile/account (Phase 2)
- Ứng viên theo dõi tiến trình ứng tuyển (Phase 2)
- Multi-language Career Site (Phase 2)

---

## Actors

| Actor | Mô tả |
|-------|-------|
| **Ứng viên** | Người dùng không đăng nhập, xem job và nộp CV |
| **System** | Gửi email xác nhận, trigger AI scoring |

---

## Technical Impact

| Layer | Ảnh hưởng |
|-------|-----------|
| **FE** | `CareerHome.tsx`, `CompanyCareerSitePage.tsx`, `CareerJobDetail.tsx`, `CareerApplyForm.tsx`, `InterviewResponsePage.tsx` |
| **BE** | `PublicController`, `ApplicationService`, `CandidateService`, `FileStorageService` |
| **DB** | Bảng `candidates`, `applications`, `career_site_settings` |
| **INFRA** | File storage (local/S3), SMTP |

---

## Danh sách Stories

| Story | Tên | Ưu tiên | SP |
|-------|-----|---------|-----|
| [STORY-17](./STORY-17_Xem_Career_Site/STORY.md) | Ứng viên xem Career Site của doanh nghiệp | 🔴 Must | 3 |
| [STORY-18](./STORY-18_Nop_CV/STORY.md) | Ứng viên xem chi tiết và nộp CV | 🔴 Must | 5 |
| [STORY-19](./STORY-19_Phan_Hoi_Lich_Phong_Van/STORY.md) | Ứng viên phản hồi lịch phỏng vấn | 🟡 Should | 3 |

---

## URL Structure

```
/careers                    → CareerHome (tất cả DN)
/careers/{slug}             → Career Site của DN cụ thể
/careers/{slug}/{jobSlug}   → Chi tiết job
/careers/{slug}/{jobSlug}/apply → Form nộp CV
/interview/respond?token=   → Trang phản hồi lịch PV
```

## Security Notes
- Tất cả API public không yêu cầu auth (no JWT)
- Rate limiting nộp CV: tối đa 3 lần/IP/ngày/job
- File upload: chỉ chấp nhận PDF/DOCX, tối đa 5MB
