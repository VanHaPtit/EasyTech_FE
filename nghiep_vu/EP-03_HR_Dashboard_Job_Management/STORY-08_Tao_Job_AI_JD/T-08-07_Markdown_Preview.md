# T-08-07 · Render Markdown trong Live Preview
> **Story:** [STORY-08](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

```bash
npm install react-markdown remark-gfm
```

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {description}
</ReactMarkdown>
```
