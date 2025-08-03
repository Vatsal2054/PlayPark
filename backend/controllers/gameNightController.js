const GameNight = require('../models/gameNight');

const createGameNight = async (req, res) => {
    try {
        const { title, date, time, location, game, invitedPlayers, maxPlayers } = req.body;

        const gameNight = await GameNight.create({
            title,
            date,
            time,
            location,
            game,
            invitedPlayers,
            maxPlayers,
            host: req.user.id
        });

        req.app.get('io').emit('gameNightCreated', gameNight);

        res.status(201).json(gameNight);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMyGameNights = async (req, res) => {
    try {
        const gameNights = await GameNight.find({ host: req.user.id }).populate('game');
        res.json(gameNights);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getGameNightById = async (req, res) => {
    try {
        const { id } = req.params;
        const gameNight = await GameNight.findById(id).populate('confirmedPlayers', 'username');
        if (!gameNight) {
            return res.status(404).json({ message: 'Game night not found' });
        }
        res.json(gameNight);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createGameNight, getMyGameNights, getGameNightById };
