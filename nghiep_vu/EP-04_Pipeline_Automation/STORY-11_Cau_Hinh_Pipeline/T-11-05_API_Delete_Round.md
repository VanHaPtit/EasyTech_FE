# T-11-05 · API `DELETE /api/jobs/{id}/rounds/{roundId}`
> **Story:** [STORY-11](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

Xóa vòng tuyển dụng và tự động cập nhật lại `orderIndex` của các vòng còn lại.

## Logic
```java
// Không cho xóa nếu có ứng viên đang ở vòng này
int activeApplicants = appRepo.countByCurrentRoundId(roundId);
if (activeApplicants > 0) {
    throw new ValidationException("Không thể xóa vòng đang có ứng viên đang xử lý");
}

roundRepo.deleteById(roundId);
// Cập nhật lại orderIndex các vòng còn lại (bắt đầu từ 1)
reindexRounds(jobId);
```

## Response (204 No Content)
