# T-22-04 · AI Providers Tab FE
> **Story:** [STORY-22](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

Hiển thị danh sách provider (OpenAI, Gemini, Anthropic).
Click [Cấu hình] → mở `ApiKeyModal`:
- Input nhập API Key (masked, type="password")
- Dropdown chọn model
- [Lưu] → gọi PUT API
- Hiển thị trạng thái: API key đã cấu hình / Chưa cấu hình
