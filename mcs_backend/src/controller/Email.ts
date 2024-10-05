import express from 'express';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(String(process.env.SENDGRID_API_KEY));
const router = express.Router();

// send email
router.post('/send-email', async (req, res) => {
  try {
    const { from, to, cc, bcc, subject, content } = req.body;
    if (!from || !to || !subject) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const msg = {
      to,
      from,
      subject,
      cc,
      bcc,
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
