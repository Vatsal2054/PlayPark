const Invitation = require('../models/invitation');
const GameNight = require('../models/gameNight');
const User = require('../models/user');

const sendInvitation = async (req, res) => {
    try {
        const { receiverId, gameNightId } = req.body;

        const gameNight = await GameNight.findById(gameNightId);
        if (!gameNight) return res.status(404).json({ message: 'Game night not found' });

        if (String(gameNight.host) !== req.user.id)
            return res.status(403).json({ message: 'Only hosts can send invitations' });

        const existing = await Invitation.findOne({ receiver: receiverId, gameNight: gameNightId });
        if (existing) return res.status(400).json({ message: 'Invitation already sent' });

        const invitation = await Invitation.create({
            gameNight: gameNightId,
            sender: req.user.id,
            receiver: receiverId
        });

        // Emit event to receiver
        req.app.get('io').to(receiverId).emit('newInvitation', {
            message: 'You have a new game night invitation',
            invitation
        });

        res.status(201).json(invitation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const respondToInvitation = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'accepted' or 'declined'

        const invitation = await Invitation.findById(id);
        if (!invitation) return res.status(404).json({ message: 'Invitation not found' });

        if (String(invitation.receiver) !== req.user.id)
            return res.status(403).json({ message: 'Not authorized' });

        invitation.status = status;
        await invitation.save();

        if (status === 'accepted') {
            const gameNight = await GameNight.findById(invitation.gameNight);
            if (!gameNight.confirmedPlayers.includes(req.user.id)) {
                gameNight.confirmedPlayers.push(req.user.id);
                await gameNight.save();
            }

            req.app.get('io').emit('registrationUpdate', {
                gameNightId: gameNight._id,
                userId: req.user.id
            });

            req.app.get('io').emit('invitationUpdated', {
                gameNightId: gameNight._id,
                invitation: invitation, // send updated invitation object
            });
        }

        res.json({ message: 'Response recorded', invitation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMyInvitations = async (req, res) => {
    try {
        const invitations = await Invitation.find({
            receiver: req.user.id,
            status: 'pending'
        })
            .populate('gameNight sender');

        res.json(invitations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getInvitationsByGameNight = async (req, res) => {
    console.log(222);
    try {
        const { id } = req.params;

        const gameNight = await GameNight.findById(id);
        if (!gameNight) {
            return res.status(404).json({ message: 'Game night not found' });
        }

        const invitations = await Invitation.find({ gameNight: id })
            .populate('sender', 'username email')
            .populate('receiver', 'username email');

        res.json(invitations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getJoinedGameNights = async (req, res) => {
    try {
        // Find all accepted invitations for this user
        const invitations = await Invitation.find({
            receiver: req.user.id,
            status: 'accepted',
        }).populate('gameNight');

        const joinedGameNights = invitations
            .map(inv => inv.gameNight)
            .filter(gn => gn !== null); // In case a gameNight was deleted

        res.json(joinedGameNights);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { sendInvitation, respondToInvitation, getMyInvitations, getInvitationsByGameNight, getJoinedGameNights };
