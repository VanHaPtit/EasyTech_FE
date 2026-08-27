# T-23-01 · Tạo bảng `cv_analyses`
> **Story:** [STORY-23](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

```sql
CREATE TABLE cv_analyses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id  UUID UNIQUE NOT NULL REFERENCES applications(id),
    score           INTEGER CHECK (score BETWEEN 0 AND 100),
    strengths       TEXT[],            -- Array of strings
    weaknesses      TEXT[],
    matched_skills  TEXT[],
    missing_skills  TEXT[],
    raw_response    JSONB,             -- Full AI response
    analyzed_at     TIMESTAMP DEFAULT NOW(),
    status          VARCHAR(20) DEFAULT 'PENDING'
                    CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED'))
);
```
