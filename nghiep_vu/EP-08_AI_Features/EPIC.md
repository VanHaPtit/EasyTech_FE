# EP-08 · AI Features

> **Epic ID:** EP-08
> **Ưu tiên:** 🟡 Should
> **Tổng SP:** 8
> **Sprint:** Sprint 2 (AI JD Writer — thuộc EP-03/STORY-08), Sprint 3 (STORY-23, 24)

---

## Mục tiêu

Tích hợp AI vào quy trình tuyển dụng để tăng hiệu quả cho HR:
- **AI JD Writer**: Tự động sinh Job Description từ thông tin job cơ bản
- **CV Scoring**: Phân tích và chấm điểm độ khớp CV vs JD
- **AI Interview Suggestions**: Gợi ý câu hỏi phỏng vấn dựa trên CV và JD

---

## Phạm vi

### In Scope
- AI JD Writer với streaming response (SSE)
- CV Scoring: parse PDF → embedding → match JD → score 0-100
- AI gợi ý điểm mạnh/yếu và câu hỏi phỏng vấn
- Disclaimer rõ ràng: kết quả AI là gợi ý, HR tự quyết

### Out of Scope
- AI phỏng vấn tự động (Phase 2)
- AI rank and sort candidates (Phase 2)
- Custom AI model fine-tuning (Phase 2)

---

## Actors

| Actor | Mô tả |
|-------|-------|
| **HR** | Sử dụng AI JD Writer, xem AI score và suggestions |
| **System** | Tự động trigger CV scoring khi ứng viên nộp CV |
| **AI Agent** | Python FastAPI service thực hiện inference |

---

## Technical Impact

| Layer | Ảnh hưởng |
|-------|-----------|
| **FE** | `JobCreateWizard.tsx` (AI panel), `CandidateDrawer.tsx` (AI score), `AISuggestionsModal.tsx` |
| **BE** | `AIProxyController`, async job queue cho CV scoring |
| **AI** | Python FastAPI: JD Writer agent, CV Scoring agent (LangChain + PDF parser) |
| **DB** | Bảng `cv_analyses`, `ai_provider_configs` |

---

## Danh sách Stories

| Story | Tên | Ưu tiên | SP |
|-------|-----|---------|-----|
| [STORY-23](./STORY-23_CV_Scoring/STORY.md) | AI chấm điểm CV theo JD (CV Scoring) | 🟡 Should | 5 |
| [STORY-24](./STORY-24_AI_Goi_Y_Cau_Hoi/STORY.md) | AI gợi ý câu hỏi phỏng vấn | 🟡 Should | 3 |

> **Note:** AI JD Writer được implement trong [EP-03/STORY-08](../EP-03_HR_Dashboard_Job_Management/STORY-08_Tao_Job_AI_JD/STORY.md)

---

## AI Architecture

```
FE → BE (Spring Boot) → AI Service (Python FastAPI)
                              ↓
                    LLM Provider (OpenAI / Gemini)
                              ↓
                    Response (stream / json)
                              ↓
              BE → FE (SSE stream / JSON response)
```

## CV Scoring Pipeline

```
Upload CV (PDF) → Extract Text (PyPDF2/pdfplumber)
               → Embedding (OpenAI Embeddings)
               → Compare với JD embedding (cosine similarity)
               → LLM analysis (strengths, weaknesses, matched skills)
               → Return JSON { score, strengths, weaknesses, matchedSkills, missingSkills }
```
