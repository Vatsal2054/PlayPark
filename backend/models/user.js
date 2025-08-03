// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['host', 'player'],
        default: 'player'
    },
    gameLibrary: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
