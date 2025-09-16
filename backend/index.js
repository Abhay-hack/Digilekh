const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./connect');
const { checkforAuthentication } = require('./middleware/auth');
const staticRoute = require('./routes/staticRouter');
const blogRoute = require('./routes/blogRouter');
const communityRoute = require('./routes/communityRouter');
const socket = require('./socket'); // Socket singleton

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

connectDb(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socket.init(server); // Use the singleton for socket.io

// Middleware
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(cookieParser());
// Increase payload limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// CORS Configuration
const allowedOrigins = [
    'http://localhost:5173',         // local dev
    'https://digilekh.vercel.app'   // production
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Routes
app.use('/community', communityRoute); // Community routes
app.use('/user', staticRoute);         // Static routes for user handling
app.use('/api', blogRoute);            // Blog API routes

// Socket.io Connection Event Handlers
const Message = require("./models/message");

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", async (communityId) => {
    socket.join(communityId);

    // Send past messages
    const pastMessages = await Message.find({ communityId }).populate("user", "fullname");
    socket.emit("receiveMessage", pastMessages);
  });

  socket.on("sendMessage", async (data) => {
    const newMessage = new Message({
      communityId: data.communityId,
      user: data.userId, // pass userId from frontend when sending
      message: data.message,
    });
    await newMessage.save();

    io.to(data.communityId).emit("receiveMessage", {
      message: newMessage.message,
      user: data.userId,
      createdAt: newMessage.createdAt,
    });
  });

  socket.on("leaveRoom", (communityId) => {
    socket.leave(communityId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


// Start the Server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
