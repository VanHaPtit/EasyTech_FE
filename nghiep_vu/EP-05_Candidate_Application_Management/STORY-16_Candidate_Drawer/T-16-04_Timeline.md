# T-16-04 · Timeline lịch sử vòng
> **Story:** [STORY-16](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

Vertical timeline component:
```tsx
{app.roundHistory.map((round, i) => (
  <TimelineItem key={i}
    icon={round.result === 'PASS' ? <CheckCircle color="green"/> : <XCircle color="red"/>}
    title={round.roundName}
    subtitle={`${round.result} · ${formatDate(round.evaluatedAt)}`}
  />
))}
```
