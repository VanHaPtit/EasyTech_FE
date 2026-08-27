# T-12-06 · Tạo bảng `application_round_statuses`
> **Story:** [STORY-12](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

```sql
CREATE TABLE application_round_statuses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id  UUID NOT NULL REFERENCES applications(id),
    round_id        UUID NOT NULL REFERENCES job_rounds(id),
    result          VARCHAR(10) CHECK (result IN ('PASS', 'FAIL', 'PENDING')),
    evaluated_by    UUID REFERENCES users(id),
    evaluated_at    TIMESTAMP DEFAULT NOW(),
    notes           TEXT
);
-- Lịch sử: ứng viên đã qua vòng nào với kết quả gì
```
