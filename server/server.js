const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors package
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const { Server } = require('socket.io');
const http = require('http');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies if needed
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/emails', emailRoutes);

// Socket.IO Setup
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Replace with your frontend's URL
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('User connected to real-time analytics');
    socket.emit('statusUpdate', { message: 'Connected to Analytics' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
