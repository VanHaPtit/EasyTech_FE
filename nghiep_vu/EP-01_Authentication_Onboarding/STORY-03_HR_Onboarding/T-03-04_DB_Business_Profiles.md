# T-03-04 · Tạo bảng `business_profiles`

> **Story:** [STORY-03](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

## Schema

```sql
CREATE TABLE business_profiles (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id   UUID UNIQUE NOT NULL REFERENCES businesses(id),
    description   TEXT,
    brand_color   VARCHAR(7),        -- hex color, e.g. "#0052cc"
    banner_url    TEXT,
    employee_count VARCHAR(50),       -- "10-50", "50-200", ...
    founded_year  INTEGER,
    created_at    TIMESTAMP DEFAULT NOW(),
    updated_at    TIMESTAMP DEFAULT NOW()
);
```

## Notes
- Quan hệ 1-1 với `businesses`
- Thông tin này được hiển thị trên Career Site
- `logo_url` vẫn nằm trong bảng `businesses` cho dễ query
