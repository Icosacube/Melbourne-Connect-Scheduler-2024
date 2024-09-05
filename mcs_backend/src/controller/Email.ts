import express from 'express';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(String(process.env.SENDGRID_API_KEY));
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY);
const router = express.Router();

// send email
router.post('/send-email', async (req, res) => {
  try {
    const { from, to, subject, content } = req.body;
    if (!from || !to || !subject || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const msg = {
      to,
      from,
      subject,
      html: content,
    };
    await sgMail.send(msg);
    console.log('Email sent');
    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
