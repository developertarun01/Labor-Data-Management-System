const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('MONGODB_URI is not defined');
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Add timeout for serverless environment
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};


module.exports = connectDB;