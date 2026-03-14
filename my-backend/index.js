 const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect Database
connectDB();

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/candidates', require('./routes/candidateRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
