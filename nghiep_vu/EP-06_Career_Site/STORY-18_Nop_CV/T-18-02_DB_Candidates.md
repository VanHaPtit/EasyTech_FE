# T-18-02 · Tạo bảng `candidates` và `applications`
> **Story:** [STORY-18](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

```sql
CREATE TABLE candidates (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    phone       VARCHAR(20),
    cv_url      TEXT,
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE applications (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id        UUID NOT NULL REFERENCES candidates(id),
    job_id              UUID NOT NULL REFERENCES job_posts(id),
    status              VARCHAR(20) DEFAULT 'NEW'
                        CHECK (status IN ('NEW','IN_PROGRESS','PASSED','REJECTED')),
    current_round_id    UUID REFERENCES job_rounds(id),
    cover_letter        TEXT,
    applied_at          TIMESTAMP DEFAULT NOW(),
    updated_at          TIMESTAMP DEFAULT NOW(),
    UNIQUE(candidate_id, job_id)  -- Mỗi ứng viên chỉ nộp 1 lần/job
);
```
