const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");


// Routes
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/games');
const gameNightRoutes = require('./routes/gameNights');
const invitationRoutes = require('./routes/invitations');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    }
});


app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Adjust as needed
    credentials: true
}));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cookieParser());

// Socket.IO logic
io.on('connection', (socket) => {
    console.log(`🟢 Socket connected: ${socket.id}`);
    const userId = socket.handshake.auth.userId; // Make sure you pass this from client
    if (userId) {
        socket.join(userId);
    }

    socket.on('disconnect', () => {
        console.log(`🔴 Socket disconnected: ${socket.id}`);
    });
});

// Share io instance via app locals
app.set('io', io);

// Routes
app.use('/auth', authRoutes);
app.use('/users', require('./routes/userRoutes'));
app.use('/games', gameRoutes);
app.use('/gamenights', gameNightRoutes);
app.use('/invitations', invitationRoutes);

// Mongo connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ MongoDB connected');
    server.listen(process.env.PORT || 5000, () => {
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
