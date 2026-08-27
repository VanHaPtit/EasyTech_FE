# T-INF-07 · Setup Python FastAPI AI Service

> **Tag:** `[AI]` `[INFRA]` · **SP:** 2

---

## Mô tả

Khởi tạo Python FastAPI project cho AI Agent service.

---

## Project Structure

```
ai_service/
├── main.py                   # FastAPI app entry point
├── routers/
│   ├── jd_writer.py          # JD Writer endpoint
│   └── cv_scorer.py          # CV Scoring endpoint
├── services/
│   ├── jd_writer_service.py
│   └── cv_scorer_service.py
├── prompts/
│   ├── jd_writer_prompt.py
│   └── cv_scorer_prompt.py
├── models/
│   └── requests.py           # Pydantic models
├── utils/
│   ├── file_downloader.py
│   └── pdf_extractor.py
├── requirements.txt
├── .env
└── Dockerfile
```

---

## requirements.txt

```
fastapi==0.111.0
uvicorn==0.30.0
openai==1.35.0
pdfplumber==0.11.0
python-docx==1.1.2
numpy==1.26.4
scikit-learn==1.5.0
python-dotenv==1.0.1
httpx==0.27.0
```

---

## main.py

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import jd_writer, cv_scorer

app = FastAPI(title="EasyTech AI Service", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"])

app.include_router(jd_writer.router, prefix="/jd-writer", tags=["JD Writer"])
app.include_router(cv_scorer.router, prefix="/cv-score", tags=["CV Scoring"])

@app.get("/health")
def health():
    return {"status": "ok"}
```

---

## Run

```bash
cd ai_service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
