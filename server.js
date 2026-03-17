import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  const { name,contact, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS  // your app password
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\ncontact${contact}\nMessage: ${message}`
    });

    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
