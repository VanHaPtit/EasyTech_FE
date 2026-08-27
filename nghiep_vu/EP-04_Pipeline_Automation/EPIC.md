# EP-04 · Pipeline & Automation

> **Epic ID:** EP-04
> **Ưu tiên:** 🔴 Must
> **Tổng SP:** 13
> **Sprint:** Sprint 2 (STORY-11, 12), Sprint 3 (STORY-13)

---

## Mục tiêu

Cho phép HR thiết kế quy trình tuyển dụng linh hoạt (pipeline vòng) cho từng job, và hệ thống tự động thực hiện các hành động (gửi email, chuyển vòng) khi HR đánh giá Pass/Fail ứng viên.

---

## Phạm vi

### In Scope
- Cấu hình số vòng tuyển dụng cho từng job (thêm/sửa/xóa/reorder)
- Gắn email template (Pass/Fail) cho từng vòng
- Tự động gửi email khi HR bấm Pass/Fail
- Tự động chuyển vòng ứng viên
- Logic vòng cuối: Pass → PASSED, Fail → REJECTED
- Đặt lịch phỏng vấn và gửi email mời tự động

### Out of Scope
- Tích hợp Google Calendar / Outlook (Phase 2)
- Zoom/Meet link tự động (Phase 2)
- Bulk evaluate nhiều ứng viên cùng lúc (Phase 2)

---

## Actors

| Actor | Mô tả |
|-------|-------|
| **HR** | Cấu hình pipeline, đánh giá Pass/Fail, đặt lịch PV |
| **System** | Tự động gửi email, chuyển vòng |
| **Ứng viên** | Nhận email, phản hồi lịch PV |

---

## Technical Impact

| Layer | Ảnh hưởng |
|-------|-----------|
| **FE** | `RoundsConfig.tsx`, `CandidateDrawer.tsx` (Pass/Fail), `InterviewSchedulerModal.tsx` |
| **BE** | `RoundController`, `EvaluationService`, `EmailService`, `InterviewService` |
| **DB** | Bảng `job_rounds`, `application_round_statuses`, `email_logs`, `interview_schedules` |
| **INFRA** | SMTP config (Mailtrap dev), email template engine |

---

## Danh sách Stories

| Story | Tên | Ưu tiên | SP |
|-------|-----|---------|-----|
| [STORY-11](./STORY-11_Cau_Hinh_Pipeline/STORY.md) | HR cấu hình Pipeline vòng tuyển dụng | 🔴 Must | 5 |
| [STORY-12](./STORY-12_Email_Automation/STORY.md) | Hệ thống Email Automation (Pass/Fail trigger) | 🔴 Must | 5 |
| [STORY-13](./STORY-13_Dat_Lich_Phong_Van/STORY.md) | HR đặt lịch phỏng vấn | 🟡 Should | 3 |

---

## Email Automation Flow

```
HR bấm [Pass] tại vòng N
  → System gọi POST /api/applications/{id}/evaluate { result: PASS }
  → EvaluationService:
      if (vòng N < vòng cuối):
          chuyển ứng viên sang vòng N+1
          gửi email passTemplate của vòng N
      else (vòng cuối):
          application.status = PASSED
          gửi email passTemplate của vòng cuối
  → Ghi EmailLog

HR bấm [Fail]
  → application.status = REJECTED
  → gửi email failTemplate của vòng hiện tại
  → Ghi EmailLog
```
