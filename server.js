const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/newsletter.html');
});

// Handle form submission
app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    // Validate email
    if (!email || !email.includes('@')) {
        return res.status(400).send('Invalid email address');
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    // Email options
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Newsletter Subscription Confirmation',
        text: 'Thank you for subscribing to our newsletter!',
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Failed to subscribe');
        }
        res.send('Subscription successful!');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});