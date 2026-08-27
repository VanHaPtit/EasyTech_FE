# T-10-03 · Hiệu ứng confetti sau publish
> **Story:** [STORY-10](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

```bash
npm install canvas-confetti
```

```tsx
import confetti from 'canvas-confetti';

useEffect(() => {
  if (published) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}, [published]);
```
