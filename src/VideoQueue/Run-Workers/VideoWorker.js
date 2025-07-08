import { videoProcessingWorker } from "../VideoWorker.js";

async function init() {
  await videoProcessingWorker.run();
}

init();
