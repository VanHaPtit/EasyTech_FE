# T-22-01 · Tạo bảng `ai_provider_configs`
> **Story:** [STORY-22](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

```sql
CREATE TABLE ai_provider_configs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id     UUID NOT NULL REFERENCES businesses(id),
    provider_name   VARCHAR(50) NOT NULL,   -- OPENAI, GEMINI, ANTHROPIC
    api_key_encrypted TEXT,                  -- AES encrypted
    model_name      VARCHAR(100),            -- gpt-4, gemini-pro
    is_active       BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
```
