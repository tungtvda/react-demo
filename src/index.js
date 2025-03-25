import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import bodyParser from "body-parser"
// Load biến môi trường từ .env
config();

const app = express();
const port = process.env.PORT || 3001;

// Add middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
// Khai báo middleware routes

app.use('/', routes);  // Changed this line

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