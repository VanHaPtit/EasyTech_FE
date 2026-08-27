# T-19-01 · Email token xác thực
> **Story:** [STORY-19](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

Email mời phỏng vấn chứa 2 link:
```
[✅ Tôi xác nhận tham gia]
→ /interview/respond?token=abc123&action=CONFIRM

[📅 Tôi muốn đổi lịch]
→ /interview/respond?token=abc123&action=RESCHEDULE
```

Token được lưu trong `interview_schedules.response_token`, hết hạn 48h kể từ khi gửi email.
