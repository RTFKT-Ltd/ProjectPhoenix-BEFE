require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3111;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:3111',
      undefined
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Serve static files from frontend/dist
app.use('/', express.static(path.join(__dirname, 'frontend/dist')));
app.use('/assets', express.static(path.join(__dirname, 'frontend/dist/assets')));

// Routes
app.use('/auth', authRoutes);

// Catch-all route to serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 