# Personal To-Do API

A small Express API for signing up, logging in, and managing personal todos. Data lives in JSON files; no database is required.

- Password hashing with bcrypt and password validation with validator.
- JWT authentication with one hour tokens.
- Logout with persistent token revocation.
- Protected profiles and todos scoped to the logged in user.
- Serialized todo file operations to prevent overlapping reads and writes within one Node process.

## Run locally

Use Node.js 22 or newer.

```bash
npm install
```

```bash
npm run dev
```

The API runs at `http://localhost:5050`.

## Try it in Postman

1. Send `POST /auth/signup` with the JSON below to register a test account.
2. Send `POST /auth/login` with the same body and copy the returned `token`.
3. For protected requests, choose **Authorization → Bearer Token** and paste the token.

```json
{
  "userName": "testuser",
  "password": "TestPass123!"
}
```

Passwords require at least eight characters, including uppercase, lowercase, a number, and a symbol. Use a fresh username for each account.

| Method | Route | Purpose | Token required |
| --- | --- | --- | --- |
| POST | `/auth/signup` | Register a user | No |
| POST | `/auth/login` | Receive a JWT | No |
| POST | `/auth/logout` | Invalidate the current JWT | Yes |
| GET | `/profile` | Get your ID and username | Yes |
| POST | `/todos` | Add a todo | Yes |
| GET | `/todos` | List your todos | Yes |
| DELETE | `/todos/:id` | Delete your own todo | Yes |

To add a todo, send this JSON to `POST /todos`:

```json
{
  "text": "Finish my authentication assignment"
}
```

Use the returned todo's `id` in `DELETE /todos/:id`. Missing or invalid tokens return `401`; deleting a missing todo or another user's todo returns `404`.

### Test logout

1. Send `POST http://localhost:5050/auth/logout` using **Authorization → Bearer Token**, with no request body.
2. Expect `200` with the response below.
3. Try `GET /profile` or `GET /todos` with the same token; expect `401`.
4. Remove the token from your client. Log in again to get a new token.

```json
{
  "message": "Logged out successfully"
}
```

Each login creates a token with a unique JWT ID (`jti`). Logout records that ID and its expiration time in `revokedTokens.json`. Authentication middleware checks this file before allowing protected requests. Only the current token is revoked; other login tokens and saved todos remain unchanged. Missing, expired, or already revoked tokens return `401` on logout.

Tokens issued before logout support was added must be replaced by logging in again.

## Storage and structure

```text
controllers/   HTTP validation and responses
Services/      Authentication, profiles, and todo storage
middleware/    JWT verification
routes/        API endpoints
app.js         Express setup
user.json      User accounts and password hashes
todos.json     Todos linked to their owners
revokedTokens.json  Logged-out token IDs and expiration times (created automatically)
```

