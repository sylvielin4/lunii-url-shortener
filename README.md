# URL Shortener

URL shortening API built with Express, TypeScript, and SQLite. This API can be used to turn a long link into a shorter one that redirects to the original URL.

## Features

- Create a short code from a long URL (`nanoid`, 7 characters)
- HTTP 302 redirect to the original URL
- Click counting on each redirect
- Analytics endpoint listing URLs and their click counts
- URL validation and short-code collision handling

## Technical choices

- **Express 5** and **TypeScript** for a clean separation of layers.
- **Sequelize + SQLite** for persistent storage in a self-contained setup.
- **nanoid** for URL-safe short codes, with collision handling via DB lookup + retry.
- **Jest** + **Supertest** for unit tests (with service mocks) and e2e tests (in-process, no open port).
- **Dependency injection** through a `ShortUrlServiceInterface` so use-cases are independent from the ORM.
- **URL validation** via the `isValidUrl` helper to match the required `invalid url` behavior.

## Prerequisites

- [Node.js](https://nodejs.org/) ≥ 22
- npm

```bash
nvm use
```

This uses the version pinned in `.nvmrc` (Node 22).

## Installation

```bash
npm install
```

## Getting started

```bash
npm run dev
```

The server listens on port **3000**.
SQLite (`data.sqlite`) is created and synced on startup.

## API

Base URL: `http://localhost:3000/api/shorturl`

### Create a short URL

```http
POST /api/shorturl/
Content-Type: application/json

{
  "originalUrl": "https://www.lunii.com"
}
```

**Response** `201`

```json
{
  "originalUrl": "https://www.lunii.com",
  "shortUrl": "V1StGXR"
}
```

**Errors**

| Status | Body                         | Cause                  |
| ------ | ---------------------------- | ---------------------- |
| `400`  | `{ "error": "invalid url" }` | Missing or invalid URL |

The URL must use `http` or `https` and include a hostname with a dot (e.g. `example.com`).
Example rejected: `https://lunii`.

### Redirect to the original URL

```http
GET /api/shorturl/:shortUrl
```

- `302` — redirect to the original URL (increments `nbClicks`)
- `404` — `{ "error": "original url not found for short url: ..." }`

### Analytics

```http
GET /api/shorturl/analytics
```

**Response** `200`

```json
[
  {
    "originalUrl": "https://www.lunii.com",
    "shortUrl": "V1StGXR",
    "nbClicks": 2
  }
]
```

## curl examples

```bash
# Create a short URL
curl -X POST http://localhost:3000/api/shorturl/ \
  -H "Content-Type: application/json" \
  -d '{"originalUrl":"https://www.lunii.com"}'

# Redirect (follow the redirect)
curl -L http://localhost:3000/api/shorturl/V1StGXR

# Analytics
curl http://localhost:3000/api/shorturl/analytics
```

## Tests

```bash
# all tests
npm test

# e2e only
npm test -- src/e2e
```

Coverage includes:

- utilities
- use-cases with a service mock
- e2e flows via Supertest

E2E tests use a dedicated SQLite file per Jest worker, isolated from `data.sqlite`.

## Scripts

| Command       | Description                |
| ------------- | -------------------------- |
| `npm run dev` | Dev server with hot reload |
| `npm test`    | Run unit and e2e tests     |

## Possible next steps

- Postgres (or another store) behind the same service interface
- Use Zod to validate request bodies/params with consistent errors.
- Rate limiting / API keys for write endpoints
- Link expiration (TTL) and custom aliases
- Pagination on analytics

## License

ISC
