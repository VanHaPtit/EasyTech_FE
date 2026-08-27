# T-18-03 · API `POST /api/public/jobs/{slug}/apply`
> **Story:** [STORY-18](./STORY.md) · **Tag:** `[BE]` · **SP:** 3

## Endpoint (Public - No Auth)
```
POST /api/public/jobs/senior-backend-dev/apply
Content-Type: multipart/form-data
```

## Request (multipart)
```
name: "Nguyễn Văn B"
email: "b@gmail.com"
phone: "0901234567"
coverLetter: "Tôi rất muốn ứng tuyển..."
cvFile: [file.pdf]
```

## Response (201)
```json
{
  "applicationId": "app-uuid",
  "message": "Nộp hồ sơ thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất."
}
```

## Business Logic
```java
1. Tìm job theo slug, validate status = ACTIVE
2. Check duplicate: candidate_id + job_id (theo email)
3. Upload CV file → lấy cvUrl
4. Tìm hoặc tạo Candidate theo email
5. Tạo Application { status=NEW, currentRound=vòng 1 của job }
6. Async: trigger CV Scoring (gọi AI Service)
7. Gửi email xác nhận
8. Return response
```

## Notes
- Kiểm tra trùng lặp: nếu email đã nộp job này → 409 "Bạn đã ứng tuyển vị trí này trước đó"
- Giới hạn tốc độ (rate limit): tối đa 3 lần nộp/IP/ngày
