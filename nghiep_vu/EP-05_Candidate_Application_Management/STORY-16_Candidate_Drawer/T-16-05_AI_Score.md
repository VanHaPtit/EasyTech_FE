# T-16-05 · AI Matching Score
> **Story:** [STORY-16](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

```tsx
// Hiển thị score dạng gauge hoặc progress bar
<ScoreGauge score={app.aiAnalysis?.score} />

// Điểm mạnh
<ul>{app.aiAnalysis?.strengths.map(s => <li key={s}>✅ {s}</li>)}</ul>

// Điểm yếu
<ul>{app.aiAnalysis?.weaknesses.map(w => <li key={w}>⚠️ {w}</li>)}</ul>

// Disclaimer
<p className="text-muted-foreground text-xs">
  * Đây là gợi ý từ AI. HR tự quyết định cuối cùng.
</p>
```
