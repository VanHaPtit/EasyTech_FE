# T-11-09 · Drag-drop reorder vòng với @dnd-kit
> **Story:** [STORY-11](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

```bash
npm install @dnd-kit/core @dnd-kit/sortable
```

```tsx
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';

const handleDragEnd = async (event) => {
  const { active, over } = event;
  if (active.id !== over.id) {
    const oldIndex = rounds.findIndex(r => r.id === active.id);
    const newIndex = rounds.findIndex(r => r.id === over.id);
    const reordered = arrayMove(rounds, oldIndex, newIndex);
    setRounds(reordered); // optimistic update
    await RoundService.reorder(jobId, reordered.map(r => r.id));
  }
};
```
