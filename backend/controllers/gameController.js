const Game = require('../models/game');

const createGame = async (req, res) => {
    try {
        const game = await Game.create({ ...req.body, createdBy: req.user.id });
        res.status(201).json(game);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getGames = async (req, res) => {
    try {
        const games = await Game.find({ createdBy: req.user.id });
        res.json(games);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createGame, getGames };
