import { Redis } from "ioredis";

// Nessecarry Condition For Redis Connection With BullMQ......
export const redisConnection = new Redis({ maxRetriesPerRequest: null });
