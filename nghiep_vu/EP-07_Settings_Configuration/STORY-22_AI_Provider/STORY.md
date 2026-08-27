# STORY-22 · HR cấu hình AI Provider & API Key

> **Epic:** [EP-07](../EPIC.md)
> **Ưu tiên:** 🟡 Should · **SP:** 3 · **Sprint:** Sprint 3

---

## User Story

> **Là** HR,
> **Tôi muốn** cấu hình nhà cung cấp AI (OpenAI / Gemini) và nhập API Key,
> **Để** các tính năng AI hoạt động với provider của tôi.

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-22-01](./T-22-01_DB_AI_Providers.md) | Tạo bảng `ai_provider_configs` | `[DB]` | 1 |
| [T-22-02](./T-22-02_API_Get_Providers.md) | API `GET /api/settings/ai-providers` | `[BE]` | 1 |
| [T-22-03](./T-22-03_API_Update_Key.md) | API `PUT /api/settings/ai-providers/{id}/key` | `[BE]` | 1 |
| [T-22-04](./T-22-04_AI_Provider_FE.md) | Kết nối tab AI Providers trong Settings | `[FE]` | 2 |
