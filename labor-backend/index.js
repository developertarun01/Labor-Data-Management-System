const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const laborRoutes = require('./routes/laborRoutes');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors(
    {
        origin: ["https://labor-data-management-system-api.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(bodyParser.json());

// Routes
app.use('/', laborRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
