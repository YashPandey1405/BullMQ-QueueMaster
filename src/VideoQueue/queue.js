// Import the BullMQ Queue class to create Redis-backed job queues
import { Queue } from "bullmq";

// Import the pre-configured Redis connection object
import { redisConnection } from "../connection.js";

// A central mapping object to keep queue names consistent across the app
export const QueueMap = {
  VIDEO_PROCESSING_QUEUE: "VIDEO_PROCESSING_QUEUE",
  NOTIFICATION_QUEUE: "NOTIFICATION_QUEUE",
  EMAIL_QUEUE: "EMAIL_QUEUE",
  WHATSAPP_QUEUE: "WHATSAPP_QUEUE",
  SMS_QUEUE: "SMS_QUEUE",
};

// Initialize the Video Processing Queue using the name from QueueMap
export const videoProcessingQueue = new Queue(
  QueueMap["VIDEO_PROCESSING_QUEUE"], // Queue name
  { connection: redisConnection }, // Redis connection
);

// Initialize the Notification Queue
export const notificationQueue = new Queue(QueueMap["NOTIFICATION_QUEUE"], {
  connection: redisConnection,
});

// Initialize the Email Queue
export const EmailQueue = new Queue(QueueMap["EMAIL_QUEUE"], {
  connection: redisConnection,
});

// Initialize the WhatsApp Queue
export const WhatsAppQueue = new Queue(QueueMap["WHATSAPP_QUEUE"], {
  connection: redisConnection,
});

// Initialize the SMS Queue
export const SmsQueue = new Queue(QueueMap["SMS_QUEUE"], {
  connection: redisConnection,
});
