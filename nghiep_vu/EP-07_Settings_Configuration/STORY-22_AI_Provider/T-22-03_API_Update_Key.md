# T-22-03 · API `PUT /api/settings/ai-providers/{id}/key`
> **Story:** [STORY-22](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Request
```json
{ "apiKey": "sk-newkey...", "modelName": "gpt-4o" }
```

## Logic
```java
// Encrypt API key trước khi lưu
String encrypted = aesEncryptService.encrypt(apiKey);
config.setApiKeyEncrypted(encrypted);
config.setModelName(modelName);
```

Dùng AES-256 với key từ `application.yml` (env variable).
