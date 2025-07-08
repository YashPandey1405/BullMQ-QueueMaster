import { notificationWorker } from "../NotificationWorker.js";

async function init() {
  await notificationWorker.run();
}

init();
