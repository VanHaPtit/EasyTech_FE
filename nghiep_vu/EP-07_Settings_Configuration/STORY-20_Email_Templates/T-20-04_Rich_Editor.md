# T-20-04 · Rich Text Editor với TipTap
> **Story:** [STORY-20](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-highlight
```

```tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const editor = useEditor({
  extensions: [StarterKit],
  content: template.body,
  onUpdate: ({ editor }) => {
    setValue('body', editor.getHTML());
  }
});
```

Custom extension để highlight `{{variable}}` với màu khác.
