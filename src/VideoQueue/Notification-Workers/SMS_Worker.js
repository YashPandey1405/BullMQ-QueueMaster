import { Worker } from "bullmq";
import { QueueMap } from "../queue.js";
import { redisConnection } from "../../connection.js";

// SMS Message Worker With Rate Limiting Of 4 SMS in 5s......
export const smsWorker = new Worker(
  QueueMap["SMS_QUEUE"],
  async (job) => {
    console.log(`Sending SMS For : ${job.data.SMS}`);
  },
  {
    connection: redisConnection,
    autorun: false,
    concurrency: 1,
    limiter: {
      max: 3,
      duration: 5 * 1000,
    },
  },
);
