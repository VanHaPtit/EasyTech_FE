# T-11-08 · Dropdown chọn Email Template
> **Story:** [STORY-11](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

```tsx
// Fetch danh sách email templates khi render form
const { data: templates } = useQuery({
  queryKey: ['email-templates'],
  queryFn: EmailTemplateService.getAll
});

<Select
  options={templates?.map(t => ({ value: t.id, label: t.name }))}
  placeholder="Chọn template email Pass..."
  onChange={(opt) => setValue('passEmailTemplateId', opt.value)}
/>
```
