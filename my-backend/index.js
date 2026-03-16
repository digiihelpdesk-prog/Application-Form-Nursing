const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

connectDB();

const { submitApplication } = require('./controllers/candidateController');

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/candidates', require('./routes/candidateRoutes'));
app.post('/api/apply', submitApplication);

app.get('/', (req, res) => {
  res.send('Nursing Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});