import { emailNotificationWorker } from "../Notification-Workers/EmailWorker.js";

async function init() {
  await emailNotificationWorker.run();
}

init();
