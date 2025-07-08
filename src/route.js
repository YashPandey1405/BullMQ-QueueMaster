import { Router } from "express";
import { z } from "zod";

import { videoProcessingQueue } from "./VideoQueue/queue.js";

const router = Router();

// Importing the 'zod' library's object and string schema functions for validation
const requestVideoPostRequestSchema = z.object({
  videoURL: z.string(), // The request must contain a 'videoURL' string
});

// A basic GET route at the root ("/") to check if the server is running
router.route("/").get((req, res) => {
  return res.json({ status: "server is up and running!" }); // Responds with a simple status message
});

// A POST route to handle video processing requests
router.route("/video-process").post(async (req, res) => {
  // Validating the request body asynchronously using the schema defined above
  const validationResult = await requestVideoPostRequestSchema.safeParseAsync(
    req.body,
  );

  // If validation fails, send a 400 Bad Request with the error details
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  // If validation passes, extract the videoURL from the validated data
  const { videoURL } = validationResult.data;

  // Add a new job to the video processing queue with a unique name using the videoURL
  const job = await videoProcessingQueue.add(`video-${videoURL}`, {
    videoURL, // Job data contains the video URL to be processed
  });
  // console.log(job);

  // Send a success response with job status and job ID
  return res.json({ status: "enqueued", jobId: job.id });
});

export default router;
