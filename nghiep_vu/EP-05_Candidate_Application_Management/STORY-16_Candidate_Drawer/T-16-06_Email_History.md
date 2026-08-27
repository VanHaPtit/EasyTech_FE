# T-16-06 · Email History Tab
> **Story:** [STORY-16](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

```tsx
{app.emailHistory.map((email, i) => (
  <div key={i} className="border rounded p-3">
    <div className="flex justify-between">
      <span className="font-medium">{email.subject}</span>
      <Badge variant={email.status === 'SENT' ? 'success' : 'error'}>
        {email.status}
      </Badge>
    </div>
    <span className="text-muted-foreground text-sm">{formatDate(email.sentAt)}</span>
  </div>
))}
```
