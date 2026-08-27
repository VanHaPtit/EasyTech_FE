# STORY-12 · Hệ thống Email Automation (Pass/Fail trigger)

> **Epic:** [EP-04](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 5 · **Sprint:** Sprint 2

---

## User Story

> **Là** Hệ thống,
> **Khi** HR bấm Pass hoặc Fail cho ứng viên,
> **Tôi muốn** tự động gửi email đúng template theo cấu hình pipeline và chuyển vòng ứng viên,
> **Để** quy trình tuyển dụng chạy tự động không cần thao tác thủ công.

---

## Luồng chi tiết

### Pass
```
HR bấm [Pass] tại vòng N
→ POST /api/applications/{id}/evaluate { result: "PASS" }
→ EvaluationService:
    Lấy vòng hiện tại (currentRound) của application
    
    if currentRound.orderIndex < maxRound:
        Tạo ApplicationRoundStatus { roundId: nextRound, status: IN_PROGRESS }
        Application.currentRoundId = nextRound.id
        → EmailService.send(passEmailTemplateId, candidate, job)
    
    else (vòng cuối):
        Application.status = PASSED
        → EmailService.send(passEmailTemplateId, candidate, job)

→ Lưu EmailLog
→ FE refresh data
```

### Fail
```
HR bấm [Fail]
→ POST /api/applications/{id}/evaluate { result: "FAIL" }
→ EvaluationService:
    Application.status = REJECTED
    → EmailService.send(failEmailTemplateId, candidate, job)
→ Lưu EmailLog
```

---

## Definition of Done

- [ ] Pass → chuyển sang vòng tiếp theo + gửi email Pass template
- [ ] Vòng cuối + Pass → status = PASSED + gửi email
- [ ] Fail → status = REJECTED + gửi email Fail template
- [ ] Email có biến được thay thế đúng: `{{candidate_name}}`, `{{job_title}}`, `{{company_name}}`
- [ ] Lưu `EmailLog` sau mỗi lần gửi (SENT / FAILED)

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-12-01](./T-12-01_API_Evaluate.md) | API `POST /api/applications/{id}/evaluate` | `[BE]` | 3 |
| [T-12-02](./T-12-02_Email_Template_Service.md) | Email Service: thay biến `{{variable}}` | `[BE]` | 2 |
| [T-12-03](./T-12-03_SMTP_Sender.md) | Email Service: gửi email qua SMTP | `[BE]` | 2 |
| [T-12-04](./T-12-04_Email_Log.md) | Lưu EmailLog sau mỗi lần gửi | `[BE]` | 1 |
| [T-12-05](./T-12-05_DB_Email_Logs.md) | Tạo bảng `email_logs` | `[DB]` | 1 |
| [T-12-06](./T-12-06_DB_Round_Statuses.md) | Tạo bảng `application_round_statuses` | `[DB]` | 1 |
| [T-12-07](./T-12-07_PassFail_FE.md) | Kết nối nút Pass/Fail với API evaluate | `[FE]` | 2 |
| [T-12-08](./T-12-08_Refresh_Board.md) | Refresh Kanban/List sau khi evaluate | `[FE]` | 1 |
