

## 3. API JSON Contract
**Endpoint:** `POST /api/v1/auth/forgot-password`
### Request Body
```json
{
  "email": "hr@techa.com"
}
```
### Response (200 OK)
```json
{
  "status": "success",
  "message": "Reset link sent to email."
}
```

