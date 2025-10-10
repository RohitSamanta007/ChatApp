console.log("Hello from server");

import express from "express";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser"

import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

const port = process.env.PORT || 8000;
const app = express();
const __dirname = path.resolve();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server is running on port no : ", port);
  connectDB();
});
