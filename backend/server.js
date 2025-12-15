const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("./models/Message");
const ChatRoom = require("./models/ChatRoom");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use("/api/chat", require("./routes/chatRoutes"));

const PORT = process.env.PORT || 5000;

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch {
    next(new Error("Auth error"));
  }
});

io.on("connection", (socket) => {
  socket.on("join_room", async (roomId) => {
    const room = await ChatRoom.findById(roomId);
    if (!room.participants.includes(socket.userId)) return;
    socket.join(roomId);
  });

  socket.on("send_message", async ({ roomId, text }) => {
    const msg = await Message.create({
      roomId,
      sender: socket.userId,
      text
    });

    const populated = await msg.populate("sender", "username avatarUrl");
    io.to(roomId).emit("receive_message", populated);
  });
});

server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});