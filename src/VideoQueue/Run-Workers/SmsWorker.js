import { smsWorker } from "../Notification-Workers/SMS_Worker.js";

async function init() {
  await smsWorker.run();
}

init();
