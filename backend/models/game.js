// models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['board', 'video', 'rpg'],
        required: true
    },
    minPlayers: Number,
    maxPlayers: Number,
    duration: String, // e.g., "30-60 minutes"
    complexity: {
        type: String,
        enum: ['easy', 'medium', 'hard']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
