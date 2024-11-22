const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
let isConnected; // Track the connection state.

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = conn.connections[0].readyState;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

