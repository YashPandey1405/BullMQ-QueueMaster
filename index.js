import express from "express";
import router from "./src/route.js";

const app = express();
const PORT = process.env.PORT ?? 8000;
app.use(express.json());

app.use("/api/v1/video", router);

app.listen(PORT, () => {
  console.log(`The App Is Listening To PORT-${PORT}`);
});
