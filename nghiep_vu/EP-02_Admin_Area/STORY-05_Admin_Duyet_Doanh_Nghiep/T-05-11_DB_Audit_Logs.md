# T-05-11 · Tạo bảng `audit_logs`

> **Story:** [STORY-05](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

## Schema
```sql
CREATE TABLE audit_logs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id    UUID NOT NULL REFERENCES users(id),
    action      VARCHAR(100) NOT NULL,  -- APPROVE_BUSINESS, REJECT_BUSINESS...
    target_id   UUID,                   -- business_id hoặc entity liên quan
    target_type VARCHAR(50),            -- BUSINESS, JOB, ...
    details     TEXT,                   -- JSON hoặc mô tả
    ip_address  VARCHAR(45),
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_logs_target ON audit_logs(target_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
```
