# 🐂 BullMQ Microservice Mini-Project – Powered by Redis

A scalable, decoupled microservice system leveraging **BullMQ + Redis** for background processing and asynchronous communication across services. Designed with **pull-based queues**, **rate-limited workers**, and **fan-out messaging**, this project demonstrates clean service separation and resilient task handling — essential in modern **system design**.

---

## 🧠 Why Queues Matter in System Design

Modern applications demand scalability, fault tolerance, and modularity — that’s where **queues** shine.

### ✅ Benefits of Queues:

- **De-coupling**: Services don't directly depend on each other. Producers push jobs without caring who processes them.
- **Asynchronous Processing**: Offload heavy or slow tasks (e.g., video encoding, sending notifications) to background workers.
- **Scalability**: Workers can scale independently. You can spawn multiple consumers based on load.
- **Retry & Fault Tolerance**: Failed jobs can be retried automatically.
- **Rate Limiting**: Control task throughput per service.

> BullMQ implements **pull-based queues**, where consumers (workers) **pull jobs** when they're ready. This keeps the system responsive and avoids overloading services.

---

## 🚀 Project Architecture Overview

![System Diagram](https://res.cloudinary.com/dah7l8utl/image/upload/v1751986555/Screenshot_2025-07-08_140932_kkp8tx.png)

### This project simulates an **event-driven, queue-based microservice system** that:

- Accepts user video upload events.
- Processes videos asynchronously.
- Sends notifications via **Email**, **WhatsApp**, and **SMS**, each on **separate queues** with **individual rate limits**.

---

## 🔧 Tech Stack

| Tool                       | Purpose                         |
| -------------------------- | ------------------------------- |
| **BullMQ**                 | Pull-based job queue engine     |
| **Redis (Valkey)**         | Fast in-memory queue backend    |
| **Node.js**                | Runtime environment             |
| **JavaScript**             | Static typing & maintainability |
| **Rate Limiters**          | Controlled message throughput   |
| **Microservice structure** | De-coupled, scalable services   |

---

## 📦 Queues & Services

### 🎬 1. Video Processing Queue

- Triggered when a user uploads a video.
- Offloads video processing (e.g., transcoding, thumbnail generation) to a background worker.
- Implements progress tracking and job completion acknowledgment.

![Video Worker](https://github.com/user-attachments/assets/2e284c26-2d74-473c-8788-16b74d833eb3)

---

### 📣 2. Notification Queue (Fan-Out System)

- On video upload completion, a **Notification Queue** is triggered.
- It acts as a **fan-out dispatcher** to three sub-queues:
  - 📧 `EmailQueue` - Email Message Worker With Rate Limiting Of 2 email in 5s
  - 💬 `WhatsAppQueue` - WhatsApp Queue Message Worker With Rate Limiting Of 2 email in 5s
  - 📱 `SMSQueue` - SMS Message Worker With Rate Limiting Of 3 email in 5s
- Each of these queues:
  - Pulls tasks independently.
  - Has a **rate-limited worker**.
  - Is isolated from others (microservice isolation).

![Fan-Out Notification Queue](https://res.cloudinary.com/dah7l8utl/image/upload/v1751987353/Screenshot_2025-07-08_203857_pktgkz.png)

---

## 📽️ Demo Video

🎥 **[Click to watch the full system demo](https://github.com/user-attachments/assets/739e2c8f-52df-486e-9398-3da5b2ae7d5e)**  
_(Shows the entire flow from video upload to notification fan-out and rate-limited delivery)_

---

## ⚙️ Features

- ✅ Microservice Architecture using queues
- ✅ Pull-based processing with BullMQ
- ✅ Decoupled producer-consumer communication
- ✅ Fan-out message pattern via NotificationQueue
- ✅ Rate limiting per notification channel
- ✅ Clean separation of concerns
- ✅ Easily scalable (spawn multiple workers per queue)

---

## 🙌 Acknowledgments

Special thanks to:

- The creators of [BullMQ](https://docs.bullmq.io/)
- Redis (Valkey) for blazing-fast queueing

---

> ⚡ Feel free to fork, modify, or contribute! Built with love for backend architecture & scalable design.
