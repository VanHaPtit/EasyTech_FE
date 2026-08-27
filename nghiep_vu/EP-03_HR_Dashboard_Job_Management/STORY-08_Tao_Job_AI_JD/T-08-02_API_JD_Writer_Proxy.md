# T-08-02 · API `POST /api/ai/jd-writer` (BE Proxy)

> **Story:** [STORY-08](./STORY.md) · **Tag:** `[BE]` · **SP:** 3

## Mô tả

BE đóng vai trò proxy giữa FE và AI Service (Python FastAPI). BE gọi AI Service và stream lại kết quả về FE qua SSE.

## Endpoint
```
POST /api/ai/jd-writer
Authorization: Bearer {token}
Content-Type: application/json
Response: text/event-stream (SSE)
```

## Request
```json
{
  "jobId": "job-uuid",
  "additionalContext": "Tập trung vào kỹ năng microservices và cloud"
}
```

## SSE Response Stream
```
data: {"type":"token","content":"## About the Role\n"}
data: {"type":"token","content":"Chúng tôi đang tìm kiếm..."}
data: {"type":"done","fullContent":"## About the Role\n..."}
```

## Implementation

```java
// AIProxyController.java
@PostMapping(value = "/ai/jd-writer", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<ServerSentEvent<String>> generateJD(@RequestBody JDWriterRequest req) {
    // 1. Lấy job detail để gửi context cho AI
    Job job = jobService.findById(req.getJobId());
    
    // 2. Gọi AI Service
    return webClient.post()
        .uri(aiServiceUrl + "/jd-writer")
        .bodyValue(buildAIRequest(job, req.getAdditionalContext()))
        .retrieve()
        .bodyToFlux(String.class)
        .map(chunk -> ServerSentEvent.builder(chunk).build());
}
```

## Files
| File | Action |
|------|--------|
| `AIProxyController.java` | [NEW] |
| `AIServiceClient.java` | [NEW] WebClient config |
| `application.yml` | `ai.service.url` config |
