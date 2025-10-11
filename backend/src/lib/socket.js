import {Server} from "socket.io"
import http from "http"
import express from "express"
import { socketAuthMiddleware } from "../middleware/socketAuthMiddleware.js";

const app = express();
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL],
        credentials: true, 
    }
})

// apply authentication middleware to all socker connections
io.use(socketAuthMiddleware)

// this is for storing online users
const userSocketMap = {} ; // {userId: socketId}

// connect to socket server
io.on("connection", (socket) => {
    console.log("A user connected . Name : ", socket.user.fullName);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id

    // io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    // with socket.on we listen for events form clients
    socket.on("disconnect", ()=> {
        console.log("A user disconnected : ", socket.user.fullName)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})

// we will use this function to check if the user is online or not
export function getReceiverSocketId(userId){
    return userSocketMap[userId]
}

export {io, app, server}