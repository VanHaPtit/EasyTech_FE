# T-07-01 · Tạo bảng `job_posts`

> **Story:** [STORY-07](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

## Schema
```sql
CREATE TABLE job_posts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id     UUID NOT NULL REFERENCES businesses(id),
    category_id     UUID REFERENCES job_categories(id),
    title           VARCHAR(255) NOT NULL,
    description     TEXT,                    -- Markdown content
    requirements    TEXT,
    benefits        TEXT,
    location        VARCHAR(255),
    salary_min      DECIMAL(15,2),
    salary_max      DECIMAL(15,2),
    salary_currency VARCHAR(10) DEFAULT 'VND',
    job_type        VARCHAR(50),             -- FULL_TIME, PART_TIME, CONTRACT
    experience_level VARCHAR(50),            -- JUNIOR, MID, SENIOR
    status          VARCHAR(20) DEFAULT 'INACTIVE'
                    CHECK (status IN ('INACTIVE','ACTIVE','CLOSED')),
    applicant_count INTEGER DEFAULT 0,
    slug            VARCHAR(255) UNIQUE,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    published_at    TIMESTAMP
);

CREATE INDEX idx_job_posts_business ON job_posts(business_id);
CREATE INDEX idx_job_posts_status ON job_posts(status);
CREATE INDEX idx_job_posts_slug ON job_posts(slug);
```
