const mongoose = require('mongoose');
const uri = "mongodb+srv://tarunbusinessmail:iJu1JBMxFPdAwXAi@laborhub.psssz.mongodb.net/?retryWrites=true&w=majority&appName=laborHub"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
