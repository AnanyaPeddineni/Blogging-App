require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const connectMongoDB = require('./config/db');


const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ 
  credentials: true, 
  origin:[ '*', 'http://localhost:3000'] 
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));


// Routes
app.use(authRoutes);
app.use(postRoutes);
app.get("/", async (req, res) => {
  return res.status(200).json({ message: "Blog app server is up and running!"})
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;