const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateAuthUrl, getTokens } = require('../config/oauthConfig');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start OAuth Flow
router.get('/oauth', (req, res) => {
    const authUrl = generateAuthUrl();
    res.json({ authUrl });
});

// Handle OAuth Callback
router.post('/oauth/callback', async (req, res) => {
    try {
        const { code } = req.body;
        const tokens = await getTokens(code);
        const user = await User.findById(req.user.id);
        user.tokens = tokens;
        await user.save();
        res.json({ message: 'OAuth tokens saved successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
