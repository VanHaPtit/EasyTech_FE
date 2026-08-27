# T-12-02 · Email Service: Thay thế biến trong template

> **Story:** [STORY-12](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

## Files
| File | Action |
|------|--------|
| `EmailTemplateService.java` | [NEW] |

## Implementation
```java
public String renderTemplate(String templateBody, Map<String, String> variables) {
    String rendered = templateBody;
    for (Map.Entry<String, String> entry : variables.entrySet()) {
        rendered = rendered.replace("{{" + entry.getKey() + "}}", entry.getValue());
    }
    return rendered;
}

// Sử dụng:
Map<String, String> vars = Map.of(
    "candidate_name", candidate.getName(),
    "job_title", job.getTitle(),
    "company_name", business.getName(),
    "interview_date", schedule.getFormattedDate()
);
String body = renderTemplate(template.getBody(), vars);
```

## Supported Variables
- `{{candidate_name}}`
- `{{job_title}}`
- `{{company_name}}`
- `{{interview_date}}`
- `{{hr_name}}`
- `{{apply_date}}`
