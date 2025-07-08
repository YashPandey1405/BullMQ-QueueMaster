import { Worker } from "bullmq";
import { QueueMap } from "../queue.js";
import { redisConnection } from "../../connection.js";

// Email Message Worker With Rate Limiting Of 2 email in 5s......
export const emailNotificationWorker = new Worker(
  QueueMap["EMAIL_QUEUE"],
  async (job) => {
    console.log(`Sending Email For : ${job.data.email}`);
  },
  {
    connection: redisConnection,
    autorun: false,
    concurrency: 1,
    limiter: {
      max: 2,
      duration: 5 * 1000,
    },
  },
);
