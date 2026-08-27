# T-23-02 · AI Agent: CV Scoring (Python FastAPI)

> **Story:** [STORY-23](./STORY.md) · **Tag:** `[AI]` · **SP:** 5

---

## Tech Stack
- **Framework:** FastAPI
- **PDF Parsing:** pdfplumber (text extraction)
- **DOCX Parsing:** python-docx
- **Embeddings:** OpenAI text-embedding-3-small
- **Similarity:** cosine_similarity (numpy/scikit-learn)
- **LLM Analysis:** GPT-4 / Gemini

---

## Endpoint
```
POST /cv-score
Content-Type: application/json
```

## Request
```json
{
  "cvUrl": "http://backend/uploads/cv/file.pdf",
  "jobDescription": "## Senior Backend Developer\n...",
  "jobRequirements": "## Requirements\n- 5+ years Java..."
}
```

## Response
```json
{
  "score": 78,
  "strengths": ["5 năm kinh nghiệm Spring Boot", "Đã làm 3 dự án microservices"],
  "weaknesses": ["Chưa có kinh nghiệm Kubernetes", "Thiếu kinh nghiệm cloud"],
  "matchedSkills": ["Java", "Spring Boot", "PostgreSQL", "Docker"],
  "missingSkills": ["Kubernetes", "Kafka", "AWS"]
}
```

---

## Implementation

```python
# cv_scorer.py
import pdfplumber
from openai import OpenAI
import numpy as np

client = OpenAI()

def extract_text_from_pdf(pdf_path: str) -> str:
    with pdfplumber.open(pdf_path) as pdf:
        return "\n".join(page.extract_text() for page in pdf.pages)

def get_embedding(text: str) -> list[float]:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text[:8000]  # Truncate to token limit
    )
    return response.data[0].embedding

def cosine_similarity(a: list, b: list) -> float:
    a, b = np.array(a), np.array(b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

async def score_cv(cv_text: str, jd_text: str) -> dict:
    # 1. Embedding similarity score
    cv_emb = get_embedding(cv_text)
    jd_emb = get_embedding(jd_text)
    similarity = cosine_similarity(cv_emb, jd_emb)
    raw_score = int(similarity * 100)
    
    # 2. LLM analysis
    prompt = f"""Phân tích độ phù hợp giữa CV và JD sau:
    
CV: {cv_text[:3000]}

JD: {jd_text[:2000]}

Trả về JSON: {{ score: 0-100, strengths: [], weaknesses: [], matchedSkills: [], missingSkills: [] }}"""
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )
    
    result = json.loads(response.choices[0].message.content)
    # Blend embedding score với LLM score
    result["score"] = int(0.3 * raw_score + 0.7 * result["score"])
    return result
```

## Files
| File | Action |
|------|--------|
| `ai_service/routers/cv_scorer.py` | [NEW] |
| `ai_service/services/cv_scorer.py` | [NEW] |
| `ai_service/utils/file_downloader.py` | [NEW] |
| `requirements.txt` | pdfplumber, python-docx, numpy |
