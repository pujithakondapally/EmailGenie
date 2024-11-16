const Email = require('../models/Email');
const nodemailer = require('nodemailer');
const oauth2Client = require('../config/oauthConfig');

exports.uploadEmails = async (req, res) => {
    try {
        const emails = req.body.emails;
        await Email.insertMany(emails);
        res.status(200).json({ message: 'Emails uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.sendEmails = async (req, res) => {
    try {
        const emails = await Email.find({ status: 'Scheduled' });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN,
            },
        });

        emails.forEach(async (email) => {
            const mailOptions = {
                from: process.env.EMAIL,
                to: email.email,
                subject: 'Custom Email',
                text: `Hello ${email.companyName}, here is a customized message.`,
            };
            await transporter.sendMail(mailOptions);
            email.status = 'Sent';
            email.sentAt = new Date();
            await email.save();
        });

        res.status(200).json({ message: 'Emails sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
