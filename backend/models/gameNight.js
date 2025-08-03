// models/GameNight.js
const mongoose = require('mongoose');

const gameNightSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: Date,
    time: String,
    location: String,
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    invitedPlayers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    confirmedPlayers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    maxPlayers: Number
}, { timestamps: true });

module.exports = mongoose.model('GameNight', gameNightSchema);
