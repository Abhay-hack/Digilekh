const express = require('express');
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./connect');
const { checkforAuthentication } = require('./middleware/auth');
const staticRoute = require('./routes/staticRouter');
const blogRoute = require('./routes/blogRouter');
const PORT = process.env.PORT || 5000;

// Connection
const MONGO_URI = process.env.MONGO_URI;

connectDb(MONGO_URI)
    .then(() => console.log("MongoDb Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow sending cookies
}));

// Routes
app.use('/user', staticRoute);
app.use('/api', blogRoute);

// Start server
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
