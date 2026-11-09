# Blog Post API

A simple Express API for creating and retrieving blog posts. Posts are stored in memory and cleared when the server restarts.

## Run

Install Node.js and npm, then run:

```bash
npm install
npm run dev
```

The server listens at `http://localhost:5000`. Development mode restarts it when source files change.

## Test with Postman

### Create a post

Send `POST http://localhost:5000/posts`. Select **Body > raw > JSON** and enter:

```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "author": "Hasan"
}
```

Expect **201 Created** with a `message` and a `blog` object containing the generated `id` and `createdAt`.

### Retrieve a post

Send `GET http://localhost:5000/posts/1`, using the ID returned when creating the post. Expect **200 OK** with the post details.

### Check error responses

| Test | Expected response |
| --- | --- |
| POST with a missing title, content, or author | 400 with an error message |
| POST with a title shorter than 3 characters | 400 with an error message |
| POST with content shorter than 10 characters | 400 with an error message |
| GET `/posts/999` when that ID does not exist | 404 with `{"error":"Post not found"}` |

All three fields must be strings. Validation trims surrounding whitespace. HTML tags are removed before storage.
