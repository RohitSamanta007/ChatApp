console.log("Hello from server")

import express from "express"
import "dotenv/config"
import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"

const port = process.env.PORT || 8000;
const app = express();

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.listen(port, ()=> console.log("Server is running on port no : ", port));