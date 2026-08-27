# T-22-02 · API `GET /api/settings/ai-providers`
> **Story:** [STORY-22](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Response
```json
[
  {
    "id": "config-uuid",
    "providerName": "OPENAI",
    "apiKeyMasked": "sk-...abcd",  // Chỉ hiện 4 ký tự cuối
    "modelName": "gpt-4",
    "isActive": true
  }
]
```
