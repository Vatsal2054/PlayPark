const express = require('express');
const router = express.Router();
const { register, login, pingUser, logout } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/', pingUser);
router.post('/logout', logout);

module.exports = router;
