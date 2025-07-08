import { Worker } from "bullmq";
import { QueueMap, notificationQueue } from "./queue.js";
import { redisConnection } from "../connection.js";

// To Create An Timeout To Replicate Some Processing Time......
const wait = (s) => new Promise((res) => setTimeout(res, s * 1000));

// Creating a worker for the VIDEO_PROCESSING_QUEUE
export const videoProcessingWorker = new Worker(
  QueueMap["VIDEO_PROCESSING_QUEUE"], // Queue name from QueueMap
  async (job) => {
    // This function runs whenever a job is picked from the queue
    console.log(`Processing Job`, job.id); // Log job ID
    console.log(`Transcoding Job`, { url: job.data }); // Log job data (video URL)

    await wait(2); // Simulate transcoding delay (e.g., 2 seconds)

    console.log(`Transcoding Job Done....`, { url: job.data }); // Log completion of transcoding
    console.log();

    // After transcoding, enqueue a new job into the NOTIFICATION_QUEUE
    await notificationQueue.add(`notification-${job.data.videoURL}`, {
      notification: `Video has been processed for ${job.data.videoURL}`,
    });

    return true; // Indicates successful completion of the job
  },
  {
    autorun: false, // Worker won't start automatically until explicitly started
    connection: redisConnection, // Redis connection for the queue
  },
);
