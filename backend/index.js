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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with frontend URL
    methods: ['GET', 'POST', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/community', communityRoute); // Community routes
app.use('/user', staticRoute);         // Static routes for user handling
app.use('/api', blogRoute);            // Blog API routes

// Socket.io Connection Event Handlers
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('sendMessage', (data) => {
        io.to(data.communityId).emit('receiveMessage', {
            message: data.message,
            user: 'Unknown', // Placeholder for user info
        });
    });

    socket.on('communityCreated', (data) => {
        console.log('New community created:', data);
    });

    socket.on('joinRoom', (communityId) => {
        socket.join(communityId);
    });

    socket.on('leaveRoom', (communityId) => {
        socket.leave(communityId);
    });
});

// Start the Server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
