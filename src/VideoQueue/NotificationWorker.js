import { Worker } from "bullmq";
import { QueueMap, EmailQueue, WhatsAppQueue, SmsQueue } from "./queue.js";
import { redisConnection } from "../connection.js";

// To Create An Timeout To Replicate Some Processing Time......
const wait = (s) => new Promise((res) => setTimeout(res, s * 1000));

// Creating a worker for the NOTIFICATION_QUEUE
export const notificationWorker = new Worker(
  QueueMap["NOTIFICATION_QUEUE"], // Queue name from QueueMap
  async (job) => {
    // This function runs whenever a notification job is picked from the queue

    console.log(`Sending notification: ${job.data.notification}`); // Log the notification being sent

    // After transcoding, enqueue a new job into the EmailQueue
    await EmailQueue.add(`Email-${job.data.notification}`, {
      email: `Processing complete: Email sent for video ${job.data.notification}.`,
    });

    // After transcoding, enqueue a new job into the WhatsAppQueue
    await WhatsAppQueue.add(`WhatsApp-${job.data.notification}`, {
      WhatsApp: `Processing complete: WhatsApp sent for video ${job.data.notification}.`,
    });

    // After transcoding, enqueue a new job into the SmsQueue
    await SmsQueue.add(`SMS-${job.data.notification}`, {
      SMS: `Processing complete: SMS sent for video ${job.data.notification}.`,
    });
  },
  {
    connection: redisConnection, // Redis connection
    autorun: false, // Manual control over starting the worker
    concurrency: 1, // Process one job at a time
    limiter: {
      max: 5, // Max 5 jobs per 10 seconds (rate limiting).....
      duration: 10 * 1000, // 10 seconds.....
    },
  },
);
