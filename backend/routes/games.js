const express = require('express');
const router = express.Router();
const { createGame, getGames } = require('../controllers/gameController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.post('/', auth, createGame);
router.get('/', auth, getGames);

module.exports = router;
