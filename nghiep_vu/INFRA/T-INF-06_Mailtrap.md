# T-INF-06 · Mailtrap SMTP Setup
> **Tag:** `[INFRA]` · **SP:** 1

1. Tạo tài khoản Mailtrap.io (free)
2. Lấy SMTP credentials
3. Config trong `.env`:
```
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
```
Mọi email trong dev sẽ vào Mailtrap inbox, không gửi thật.
