# T-08-03 · AI Agent JD Writer (Python FastAPI)

> **Story:** [STORY-08](./STORY.md) · **Tag:** `[AI]` · **SP:** 5

---

## Mô tả

Xây dựng AI Agent viết Job Description tự động bằng Python FastAPI với streaming SSE response.

## Tech Stack
- **Framework:** FastAPI + uvicorn
- **AI:** OpenAI GPT-4 / Google Gemini (cấu hình theo provider)
- **Streaming:** Server-Sent Events (SSE)
- **Prompt:** Carefully engineered prompt template

---

## Endpoint
```
POST /jd-writer
Content-Type: application/json
Response: text/event-stream
```

## Request
```json
{
  "title": "Senior Backend Developer",
  "category": "IT",
  "location": "TP.HCM",
  "jobType": "FULL_TIME",
  "experienceLevel": "SENIOR",
  "salaryRange": "30M - 50M VND",
  "additionalContext": "Tập trung vào microservices"
}
```

## Prompt Template

```python
SYSTEM_PROMPT = """Bạn là chuyên gia tuyển dụng với 10 năm kinh nghiệm.
Hãy viết Job Description chuyên nghiệp, hấp dẫn bằng tiếng Việt.
Sử dụng Markdown format với các section rõ ràng."""

USER_PROMPT = """Viết JD cho vị trí: {title}
- Ngành: {category}
- Địa điểm: {location}
- Loại: {job_type}
- Cấp độ: {experience_level}
- Lương: {salary_range}
- Yêu cầu thêm: {additional_context}

Format JD với các section: About the Role, Responsibilities, Requirements, Benefits"""
```

## Implementation

```python
# main.py
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import openai

app = FastAPI()

@app.post("/jd-writer")
async def generate_jd(request: JDRequest):
    async def stream_jd():
        async for chunk in openai.ChatCompletion.acreate(
            model="gpt-4",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": build_prompt(request)}
            ],
            stream=True
        ):
            token = chunk.choices[0].delta.get("content", "")
            if token:
                yield f"data: {json.dumps({'type': 'token', 'content': token})}\n\n"
        yield f"data: {json.dumps({'type': 'done'})}\n\n"
    
    return StreamingResponse(stream_jd(), media_type="text/event-stream")
```

## Files
| File | Action |
|------|--------|
| `ai_service/main.py` | [NEW] FastAPI app |
| `ai_service/routers/jd_writer.py` | [NEW] Route |
| `ai_service/prompts/jd_writer.py` | [NEW] Prompt templates |
| `ai_service/models/requests.py` | [NEW] Pydantic models |
| `ai_service/requirements.txt` | [NEW] openai, fastapi, uvicorn |

## Notes
- Hỗ trợ swap provider: OpenAI ↔ Gemini qua config
- Temperature = 0.7 cho creative writing
- Max tokens = 2000
