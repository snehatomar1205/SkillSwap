const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');


const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, async() => {
    await connectDB();
    console.log(`Server running on port ${PORT}`)
});
