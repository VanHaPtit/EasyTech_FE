# T-20-05 · Preview Email
> **Story:** [STORY-20](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

```tsx
const previewHtml = template.body
  .replace('{{candidate_name}}', 'Nguyễn Văn B (ví dụ)')
  .replace('{{job_title}}', 'Senior Backend Dev')
  .replace('{{company_name}}', businessName);

<iframe srcDoc={previewHtml} className="w-full h-64 border rounded" />
```
