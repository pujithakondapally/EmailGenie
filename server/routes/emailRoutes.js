const express = require('express');
const { uploadEmails, sendEmails } = require('../controllers/emailController');
const router = express.Router();

router.post('/upload', uploadEmails);
router.post('/send', sendEmails);

module.exports = router;
