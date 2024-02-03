// models/LoginEvent.js
const mongoose = require('mongoose');

const loginEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model or your user schema
    },
    // Other fields for your login event, if needed
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('LoginEvent', loginEventSchema);