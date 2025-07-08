import { Worker } from "bullmq";
import { QueueMap } from "../queue.js";
import { redisConnection } from "../../connection.js";

// WhatsApp Message Worker With Rate Limiting Of 2 WhatsApp in 5s......
export const WhatsAppWorker = new Worker(
  QueueMap["WHATSAPP_QUEUE"],
  async (job) => {
    console.log(`Sending WhatsApp For : ${job.data.WhatsApp}`);
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
