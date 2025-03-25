import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import routes from "./src/routes/index.js";

// Load biến môi trường từ .env
config();

const app = express();
const port = process.env.PORT || 3001;

// Khai báo middleware routes
// routes.routes(app);

const mongoDbConnectionOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.NODE_APP_MONGO_URL_CLIENT, mongoDbConnectionOption)
  .then(() => {
    console.log("✅ MongoDB Connection ok!");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});