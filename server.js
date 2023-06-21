import { createServer } from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";
import cloudinary from "cloudinary";
import { initSocketIO } from "./controllers/Msg.js";

config({
  path: "./config/config.env",
});

connectDatabase();

cloudinary.config({
  cloud_name: "dggcqog8y",
  api_key: "319574675196894",
  api_secret: "GMfyJ_C0Dz0ykltVYooYh5Pc0tI",
});

const server = createServer(app);

initSocketIO(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
