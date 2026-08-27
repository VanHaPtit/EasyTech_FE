# T-13-02 · API `POST /api/applications/{id}/interview`
> **Story:** [STORY-13](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

## Request
```json
{
  "scheduledAt": "2026-09-05T14:00:00",
  "durationMins": 60,
  "location": "Google Meet",
  "meetingLink": "https://meet.google.com/abc-xyz",
  "emailTemplateId": "tpl-uuid"
}
```

## Logic
```java
1. Tạo InterviewSchedule
2. Generate response_token (UUID random, hết hạn 48h)
3. Build email với link: /interview/respond?token={token}
4. Gửi email mời phỏng vấn
5. Return schedule
```
