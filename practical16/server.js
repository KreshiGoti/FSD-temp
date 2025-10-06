const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'portfolio', 'views')));

// Route for contact page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'portfolio', 'views', 'contact.html'));
});

// Handle form submission
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: `Sender: ${email}\n\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      return res.send('<h2>❌ Failed to send message. Please try again.</h2>');
    }
    res.send('<h2>✅ Message sent successfully! Thank you for contacting us.</h2>');
  });
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
