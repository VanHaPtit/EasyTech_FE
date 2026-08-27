# STORY-23 · AI chấm điểm CV theo JD (CV Scoring)

> **Epic:** [EP-08](../EPIC.md)
> **Ưu tiên:** 🟡 Should · **SP:** 5 · **Sprint:** Sprint 3

---

## User Story

> **Là** Hệ thống,
> **Khi** ứng viên nộp CV,
> **Tôi muốn** AI tự động phân tích và chấm điểm độ khớp giữa CV và JD,
> **Để** HR có thêm cơ sở đánh giá nhanh và khách quan.

---

## Luồng chi tiết

```
Ứng viên nộp CV → Application được tạo (status=NEW)
→ BE async trigger: POST /ai-service/cv-score { cvUrl, jobDescription }
→ AI Service (Python):
    1. Download CV từ URL
    2. Extract text từ PDF/DOCX
    3. Embed CV text (OpenAI Embeddings)
    4. Embed JD text
    5. Cosine similarity score
    6. LLM analysis: strengths, weaknesses, matched/missing skills
    7. Return JSON result
→ BE lưu vào `cv_analyses`
→ HR xem trong CandidateDrawer tab "AI Analysis"
```

---

## Definition of Done

- [ ] AI trả về: score (0-100), strengths, weaknesses, matchedSkills, missingSkills
- [ ] Kết quả hiển thị trong CandidateDrawer
- [ ] Disclaimer: "Đây là gợi ý AI, HR tự quyết định cuối cùng"
- [ ] Nút "Chạy lại phân tích" hoạt động

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-23-01](./T-23-01_DB_CV_Analyses.md) | Tạo bảng `cv_analyses` | `[DB]` | 1 |
| [T-23-02](./T-23-02_AI_CV_Scoring_Agent.md) | AI Agent: CV Scoring (Python FastAPI) | `[AI]` | 5 |
| [T-23-03](./T-23-03_API_Analyze_CV.md) | API `POST /api/applications/{id}/analyze-cv` | `[BE]` | 2 |
| [T-23-04](./T-23-04_Auto_Trigger.md) | Auto trigger CV scoring sau khi nộp | `[BE]` | 1 |
| [T-23-05](./T-23-05_Score_UI.md) | Hiển thị score trong CandidateDrawer | `[FE]` | 1 |
| [T-23-06](./T-23-06_Rerun_Button.md) | Nút "Chạy lại phân tích" | `[FE]` | 1 |
