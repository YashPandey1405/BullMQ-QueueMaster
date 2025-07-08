import { WhatsAppWorker } from "../Notification-Workers/WhatsappWorker.js";

async function init() {
  await WhatsAppWorker.run();
}

init();
