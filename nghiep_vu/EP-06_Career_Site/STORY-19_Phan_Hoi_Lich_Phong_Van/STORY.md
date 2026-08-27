# STORY-19 · Ứng viên phản hồi lịch phỏng vấn

> **Epic:** [EP-06](../EPIC.md)
> **Ưu tiên:** 🟡 Should · **SP:** 3 · **Sprint:** Sprint 3

---

## User Story

> **Là** Ứng viên,
> **Tôi muốn** nhận email mời phỏng vấn và có thể đồng ý hoặc xin đổi lịch qua link trong email,
> **Để** xác nhận lịch phỏng vấn thuận tiện mà không cần đăng nhập.

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-19-01](./T-19-01_Email_Token.md) | Link respond trong email với token xác thực | `[BE]` | 2 |
| [T-19-02](./T-19-02_API_Verify_Token.md) | API `GET /api/public/interviews/respond?token=` | `[BE]` | 1 |
| [T-19-03](./T-19-03_API_Submit_Response.md) | API `PUT /api/public/interviews/respond` | `[BE]` | 1 |
| [T-19-04](./T-19-04_Response_Page_FE.md) | Kết nối InterviewResponsePage với API | `[FE]` | 1 |
