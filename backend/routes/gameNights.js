const express = require('express');
const router = express.Router();
const { createGameNight, getMyGameNights, getGameNightById } = require('../controllers/gameNightController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.post('/', auth, createGameNight);
router.get('/', auth, getMyGameNights);
router.get('/:id', auth, getGameNightById);

module.exports = router;
