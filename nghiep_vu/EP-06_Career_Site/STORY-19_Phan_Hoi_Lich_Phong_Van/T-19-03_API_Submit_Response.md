# T-19-03 · API submit response
> **Story:** [STORY-19](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

```
PUT /api/public/interviews/respond
Body: { token: "abc123", response: "CONFIRMED" | "RESCHEDULE_REQUESTED" }
→ Cập nhật interview_schedules.response_status
→ Gửi email thông báo cho HR
```
