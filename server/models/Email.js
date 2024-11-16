const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    companyName: String,
    location: String,
    email: String,
    products: String,
    status: { type: String, enum: ['Scheduled', 'Sent', 'Failed', 'Bounced', 'Opened'] },
    sentAt: Date,
});

module.exports = mongoose.model('Email', emailSchema);
