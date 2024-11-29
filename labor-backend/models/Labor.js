const mongoose = require('mongoose');

const laborSchema = new mongoose.Schema({
    name: { type: String, required: true },
    skills: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    colony: { type: String, required: true },
    city: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Labor', laborSchema);