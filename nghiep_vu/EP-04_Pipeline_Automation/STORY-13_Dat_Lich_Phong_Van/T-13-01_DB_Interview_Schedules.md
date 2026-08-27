# T-13-01 · Tạo bảng `interview_schedules`
> **Story:** [STORY-13](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

```sql
CREATE TABLE interview_schedules (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id  UUID NOT NULL REFERENCES applications(id),
    round_id        UUID REFERENCES job_rounds(id),
    scheduled_at    TIMESTAMP NOT NULL,
    duration_mins   INTEGER DEFAULT 60,
    location        VARCHAR(255),          -- "Zoom", "Google Meet", "123 Nguyễn Huệ"
    meeting_link    TEXT,
    email_template_id UUID REFERENCES email_templates(id),
    response_token  VARCHAR(255) UNIQUE,   -- Token cho ứng viên confirm lịch
    response_status VARCHAR(20) DEFAULT 'PENDING'
                    CHECK (response_status IN ('PENDING','CONFIRMED','RESCHEDULE_REQUESTED')),
    created_at      TIMESTAMP DEFAULT NOW()
);
```
