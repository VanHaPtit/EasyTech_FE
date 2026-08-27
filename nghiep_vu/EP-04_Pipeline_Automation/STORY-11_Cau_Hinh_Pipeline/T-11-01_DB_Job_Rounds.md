# T-11-01 · Tạo bảng `job_rounds`
> **Story:** [STORY-11](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

```sql
CREATE TABLE job_rounds (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id                  UUID NOT NULL REFERENCES job_posts(id) ON DELETE CASCADE,
    name                    VARCHAR(255) NOT NULL,   -- "CV Review", "Technical Test", "Interview"
    order_index             INTEGER NOT NULL,         -- Thứ tự vòng, bắt đầu từ 1
    pass_email_template_id  UUID REFERENCES email_templates(id),
    fail_email_template_id  UUID REFERENCES email_templates(id),
    created_at              TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_job_rounds_job_order ON job_rounds(job_id, order_index);
```
