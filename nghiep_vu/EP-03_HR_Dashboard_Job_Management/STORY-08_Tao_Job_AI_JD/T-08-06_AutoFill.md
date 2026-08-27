# T-08-06 · Auto-fill form từ AI response
> **Story:** [STORY-08](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

Khi HR bấm [Áp dụng JD]:
```tsx
// Dùng react-hook-form setValue
form.setValue('description', generatedContent);
setCurrentPanel(1); // Back về panel 1 để HR review
```
