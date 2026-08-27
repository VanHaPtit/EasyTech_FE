# T-08-09 · Tạo bảng `job_categories`
> **Story:** [STORY-08](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

```sql
CREATE TABLE job_categories (
    id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name  VARCHAR(100) UNIQUE NOT NULL,
    slug  VARCHAR(100) UNIQUE NOT NULL
);

-- Seed data
INSERT INTO job_categories (id, name, slug) VALUES
  (gen_random_uuid(), 'Công nghệ thông tin', 'it'),
  (gen_random_uuid(), 'Tài chính - Ngân hàng', 'finance'),
  (gen_random_uuid(), 'Marketing', 'marketing'),
  (gen_random_uuid(), 'Kế toán', 'accounting'),
  (gen_random_uuid(), 'Nhân sự', 'hr'),
  (gen_random_uuid(), 'Kinh doanh', 'sales');
```
