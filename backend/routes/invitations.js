const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    sendInvitation,
    respondToInvitation,
    getMyInvitations,
    getInvitationsByGameNight,
    getJoinedGameNights
} = require('../controllers/invitationController');

router.use(auth);

router.get('/game-night/:id', auth, getInvitationsByGameNight);
router.post('/', auth, sendInvitation);
router.get('/', auth, getMyInvitations);
router.get('/joined', auth, getJoinedGameNights); 
router.patch('/:id', auth, respondToInvitation);

module.exports = router;
