# T-08-05 · Kết nối Panel 2 với AI JD Writer API

> **Story:** [STORY-08](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

## Implementation — SSE Streaming

```tsx
const generateJD = async () => {
  setIsGenerating(true);
  setGeneratedContent('');
  
  const eventSource = new EventSource('/api/ai/jd-writer', {
    // POST request qua fetch với SSE
  });
  
  // Dùng fetch + ReadableStream thay vì EventSource (để support POST)
  const response = await fetch('/api/ai/jd-writer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ jobId, additionalContext })
  });
  
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    // Parse SSE: "data: {...}\n\n"
    const data = JSON.parse(chunk.replace('data: ', ''));
    if (data.type === 'token') {
      setGeneratedContent(prev => prev + data.content);
    }
  }
  setIsGenerating(false);
};
```
