# T-23-04 · Auto trigger CV scoring sau khi nộp
> **Story:** [STORY-23](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

Trong `ApplicationService.apply()`, sau khi tạo Application thành công:
```java
// Async - không block response trả về ứng viên
applicationEventPublisher.publishEvent(new ApplicationCreatedEvent(application.getId()));

// @EventListener trong CVScoringService
@EventListener
@Async
public void handleApplicationCreated(ApplicationCreatedEvent event) {
    analyzeCVAsync(event.getApplicationId());
}
```
