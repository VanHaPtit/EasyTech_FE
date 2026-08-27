# T-05-09 · Ghi AuditLog sau mỗi Admin Action

> **Story:** [STORY-05](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Files
| File | Action |
|------|--------|
| `AuditLogService.java` | [NEW] |
| `AuditLogRepository.java` | [NEW] |
| `AuditLog.java` | [NEW] Entity |

## Service
```java
@Service
public class AuditLogService {
    public void log(UUID adminId, String action, UUID targetId) {
        log(adminId, action, targetId, null);
    }
    
    public void log(UUID adminId, String action, UUID targetId, String details) {
        AuditLog log = AuditLog.builder()
            .adminId(adminId).action(action)
            .targetId(targetId).details(details)
            .createdAt(LocalDateTime.now()).build();
        auditLogRepo.save(log);
    }
}
```

## Actions
- `APPROVE_BUSINESS`, `REJECT_BUSINESS`, `BLOCK_BUSINESS`
