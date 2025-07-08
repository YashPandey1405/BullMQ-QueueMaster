## 🚀 Project Architecture – Logic-Only Breakdown

This project simulates a **decoupled, pull-based microservices system** using BullMQ + Redis, handling **video uploads** and **fan-out notifications**.

---

## 📦 Queues & Processing Logic

![System Diagram](https://res.cloudinary.com/dah7l8utl/image/upload/v1751986555/Screenshot_2025-07-08_140932_kkp8tx.png)

### 🎬 1. `VideoProcessingQueue`

- When a user uploads a video, a job is added to this queue.
- A `video.worker.ts` processes this job:
  - Simulates tasks like transcoding or thumbnail generation.
  - On success, it triggers a job in the `NotificationQueue`.

---

### 📣 2. `NotificationQueue` – Fan-Out Dispatcher

- On job reception, `notification.worker.ts` splits the task into 3 downstream queues:
  - 📧 `EmailQueue`
  - 💬 `WhatsAppQueue`
  - 📱 `SMSQueue`

Each notification channel is:

- **Pull-based** (`queue.process(...)`)
- **Rate-limited** using BullMQ’s limiter config.
- Isolated, meaning failure or delay in one doesn’t block others.

![Fan-Out Notification Queue](https://res.cloudinary.com/dah7l8utl/image/upload/v1751987353/Screenshot_2025-07-08_203857_pktgkz.png)

---

## 🧱 Worker Rate Limits (Enforced per channel)

| Worker         | Rate Limit             |
| -------------- | ---------------------- |
| EmailWorker    | 2 messages / 5 seconds |
| WhatsAppWorker | 2 messages / 5 seconds |
| SMSWorker      | 3 messages / 5 seconds |

---

## 🔁 Flow Summary

1. `User Upload` ➝ Job in `VideoProcessingQueue`
2. `VideoWorker` processes job ➝ On success ➝ Job to `NotificationQueue`
3. `NotificationWorker` ➝ Fan-out ➝ Jobs into Email, WhatsApp, SMS Queues
4. Each channel’s worker pulls jobs independently & respects rate limits

---

✅ Result: Scalable, isolated, event-driven processing pipeline using Redis + BullMQ
