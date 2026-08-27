# T-INF-13 · Docker Compose

> **Tag:** `[INFRA]` · **SP:** 2

---

## docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: easytech
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./EasyTech_BE
    ports:
      - "8080:8080"
    environment:
      DB_USERNAME: postgres
      DB_PASSWORD: postgres
      JWT_SECRET: your-secret-key-here
    depends_on:
      - postgres
      - redis

  ai_service:
    build: ./EasyTech_AI
    ports:
      - "8000:8000"
    environment:
      OPENAI_API_KEY: ${OPENAI_API_KEY}

  frontend:
    build: ./EasyTech_FE
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```
