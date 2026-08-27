# T-12-05 · Tạo bảng `email_logs`
> **Story:** [STORY-12](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

```sql
CREATE TABLE email_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id  UUID REFERENCES applications(id),
    template_id     UUID REFERENCES email_templates(id),
    recipient_email VARCHAR(255) NOT NULL,
    subject         VARCHAR(500),
    status          VARCHAR(20) NOT NULL CHECK (status IN ('SENT', 'FAILED')),
    error_message   TEXT,
    sent_at         TIMESTAMP DEFAULT NOW()
);
```
