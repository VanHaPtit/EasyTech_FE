# T-16-03 · CV Link/Download
> **Story:** [STORY-16](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

```tsx
<a href={app.candidate.cvUrl} target="_blank" rel="noopener noreferrer"
   className="flex items-center gap-2 text-primary underline">
  <FileIcon /> Xem CV (PDF)
</a>
<button onClick={() => downloadFile(app.candidate.cvUrl)}>
  Tải xuống
</button>
```
