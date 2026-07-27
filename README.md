# Background Job Processing Demo

A Node.js backend application demonstrating asynchronous background job processing using **Express**, **BullMQ**, and **Redis**.

This project follows the professional pattern of **accepting requests immediately, processing them in the background, and allowing clients to track job status**.

---

## 🚀 Features

- REST API built with Express.js
- Background job processing using BullMQ
- Redis-backed job queue
- Asynchronous worker process
- Instant `202 Accepted` response
- Job status tracking
- Automatic retry mechanism
- Exponential backoff for failed jobs
- Production-style logging
- Environment-based configuration

---

## 🏗️ Architecture

```
                +------------------+
                |      Client      |
                +--------+---------+
                         |
               POST /api/jobs/generate
                         |
                         ▼
               +------------------+
               |   Express API    |
               +--------+---------+
                        |
                  Add Job to Queue
                        |
                        ▼
               +------------------+
               |   BullMQ Queue   |
               |     (Redis)      |
               +--------+---------+
                        |
                 Background Worker
                        |
                        ▼
             Process Long Running Task
                        |
                        ▼
              Update Job Status/Result
                        |
                        ▼
            GET /api/jobs/:jobId
```

---

## 📂 Project Structure

```
background-job-demo/
│
├── src/
│   ├── config/
│   │   └── redis.js
│   │
│   ├── controllers/
│   │   └── jobs.controller.js
│   │
│   ├── queue/
│   │   ├── jobQueue.js
│   │   └── worker.js
│   │
│   ├── routes/
│   │   └── jobs.routes.js
│   │
│   ├── services/
│   │
│   ├── storage/
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- BullMQ
- Redis
- Docker (Redis Container)
- JavaScript (ES6)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Abhi-T-A/background-job-demo.git
cd background-job-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file:

```env
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 4. Start Redis

Using Docker:

```bash
docker run -d --name redis -p 6379:6379 redis:7
```

### 5. Start the API Server

```bash
npm run dev
```

### 6. Start the Worker

Open another terminal:

```bash
npm run worker
```

---

## 📌 API Endpoints

### Queue a Job

**POST**

```
/api/jobs/generate
```

Request

```json
{
  "prompt": "Generate monthly sales report"
}
```

Response

```json
{
  "success": true,
  "message": "Job queued successfully",
  "jobId": "1"
}
```

Status Code

```
202 Accepted
```

---

### Get Job Status

**GET**

```
/api/jobs/:jobId
```

Example Response

```json
{
  "jobId": "1",
  "state": "completed",
  "data": {
    "prompt": "Generate monthly sales report"
  },
  "result": {
    "success": true,
    "message": "Report Generated"
  },
  "failedReason": null
}
```

---

## 🔁 Retry Mechanism

Jobs are configured with:

- 3 automatic retry attempts
- Exponential backoff
- Failed job tracking
- Automatic cleanup of completed jobs

Configuration:

```javascript
attempts: 3,
backoff: {
    type: "exponential",
    delay: 2000
}
```

---

## 🧪 Testing

### Successful Job

```json
{
  "prompt": "Generate monthly sales report"
}
```

### Failed Job (Retry Demo)

```json
{
  "prompt": "fail"
}
```

This simulates a worker failure and demonstrates BullMQ's automatic retry mechanism.

---

## 📖 Key Concepts Demonstrated

- Asynchronous Processing
- Background Workers
- Job Queues
- Redis Integration
- Worker Retry Strategy
- Exponential Backoff
- Job State Tracking
- REST API Design
- Separation of Concerns

---

## 📈 Future Improvements

- Bull Board dashboard
- Swagger/OpenAPI documentation
- Request validation
- Structured logging
- Unit and integration tests
- Docker Compose
- Health check endpoint
- Monitoring and alerts

---

## 👨‍💻 Author

**Abhi T A**

Backend AI Engineer Intern

GitHub: https://github.com/Abhi-T-A
