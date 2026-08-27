# T-15-03 · Click row → mở CandidateDrawer
> **Story:** [STORY-15](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

```tsx
const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

<TableRow onClick={() => setSelectedAppId(app.id)} className="cursor-pointer hover:bg-muted">
  ...
</TableRow>

<CandidateDrawer
  applicationId={selectedAppId}
  isOpen={!!selectedAppId}
  onClose={() => setSelectedAppId(null)}
/>
```
