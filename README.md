# Background Job Demo

Express + BullMQ + Redis background job processing demo.

## Features

- Express REST API
- BullMQ Queue
- Redis
- Background Worker
- Job Status Endpoint
- Automatic Retry
- Exponential Backoff

## Installation

```bash
npm install
docker run -d --name redis -p 6379:6379 redis:7
npm run dev
npm run worker
```

## Endpoints

```text
POST /api/jobs/generate
GET /api/jobs/:jobId
```
