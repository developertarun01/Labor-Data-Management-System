const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const laborRoutes = require('./routes/laborRoutes');
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Connect to database
connectDB();

// Middleware
app.use(cors({
    origin: "https://labor-data-management-system.vercel.app", // Your frontend domain
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

// Routes
app.use('/', laborRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
