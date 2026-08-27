# STORY-11 · HR cấu hình Pipeline vòng tuyển dụng

> **Epic:** [EP-04](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 5 · **Sprint:** Sprint 2

---

## User Story

> **Là** HR,
> **Tôi muốn** thiết lập các vòng tuyển dụng cho từng job (số vòng, tên, email template),
> **Để** hệ thống tự động biết gửi email gì và chuyển ứng viên đến đâu khi Pass/Fail.

---

## Luồng chi tiết

```
HR vào /dashboard/jobs/{id}/rounds
→ GET /api/jobs/{id}/rounds → hiển thị danh sách vòng hiện tại

Thêm vòng mới:
→ Bấm [+ Thêm vòng] → inline form
→ Nhập: Tên vòng, Email Pass Template (dropdown), Email Fail Template (dropdown)
→ POST /api/jobs/{id}/rounds

Sửa vòng:
→ Inline edit hoặc modal
→ PUT /api/jobs/{id}/rounds/{roundId}

Xóa vòng:
→ Confirm dialog → DELETE /api/jobs/{id}/rounds/{roundId}

Reorder:
→ Drag & drop → PUT /api/jobs/{id}/rounds/reorder { orderedIds: [...] }
```

---

## Definition of Done

- [ ] CRUD vòng hoạt động với API thật
- [ ] Gắn email template Pass/Fail cho từng vòng qua dropdown
- [ ] Thứ tự vòng được xác định bởi `orderIndex`
- [ ] Job không publish được nếu chưa có vòng

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-11-01](./T-11-01_DB_Job_Rounds.md) | Tạo bảng `job_rounds` | `[DB]` | 1 |
| [T-11-02](./T-11-02_API_Get_Rounds.md) | API `GET /api/jobs/{id}/rounds` | `[BE]` | 1 |
| [T-11-03](./T-11-03_API_Create_Round.md) | API `POST /api/jobs/{id}/rounds` | `[BE]` | 1 |
| [T-11-04](./T-11-04_API_Update_Round.md) | API `PUT /api/jobs/{id}/rounds/{roundId}` | `[BE]` | 1 |
| [T-11-05](./T-11-05_API_Delete_Round.md) | API `DELETE /api/jobs/{id}/rounds/{roundId}` | `[BE]` | 1 |
| [T-11-06](./T-11-06_API_Reorder.md) | API `PUT /api/jobs/{id}/rounds/reorder` | `[BE]` | 1 |
| [T-11-07](./T-11-07_RoundsConfig_FE.md) | Kết nối RoundsConfig.tsx với API | `[FE]` | 3 |
| [T-11-08](./T-11-08_Template_Dropdown.md) | Dropdown chọn Email Template | `[FE]` | 2 |
| [T-11-09](./T-11-09_DnD_Reorder.md) | Drag-drop reorder vòng | `[FE]` | 2 |
