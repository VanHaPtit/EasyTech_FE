# T-12-03 · Email Service: Gửi email qua SMTP

> **Story:** [STORY-12](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

## Dependencies
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

## Config (application.yml)
```yaml
spring:
  mail:
    host: smtp.mailtrap.io      # Dev: Mailtrap
    port: 587
    username: ${MAIL_USERNAME}
    password: ${MAIL_PASSWORD}
    properties.mail.smtp:
      auth: true
      starttls.enable: true
```

## EmailService
```java
@Service
public class EmailService {
    public void send(UUID templateId, Application app) {
        EmailTemplate template = templateRepo.findById(templateId).orElseThrow();
        Candidate candidate = app.getCandidate();
        
        String body = templateService.renderTemplate(template.getBody(), buildVars(app));
        
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(candidate.getEmail());
        helper.setSubject(template.getSubject());
        helper.setText(body, true); // true = HTML
        
        try {
            mailSender.send(message);
            emailLogService.save(app.getId(), templateId, "SENT");
        } catch (Exception e) {
            emailLogService.save(app.getId(), templateId, "FAILED");
            log.error("Failed to send email", e);
        }
    }
}
```
