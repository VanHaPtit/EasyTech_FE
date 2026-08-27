# T-20-01 · Tạo bảng `email_templates`
> **Story:** [STORY-20](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

```sql
CREATE TABLE email_templates (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id),
    name        VARCHAR(255) NOT NULL,
    subject     VARCHAR(500) NOT NULL,
    body        TEXT NOT NULL,          -- HTML content
    type        VARCHAR(50),            -- PASS, FAIL, INVITE, THANK_YOU
    is_default  BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW()
);
```
