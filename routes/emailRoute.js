import { sendEmail } from '../middleware/sendEmail.js';

const emailRoute = async (req, res) => {
  // All data should be cleaned here before you send it to your middleware
  // Security should be applied here before you send it to your middleware
  if (req.method === 'POST') {
    let emailObj = req.body;
    let emailResponse = await sendEmail(emailObj);
    console.log('NODEMAILER RES: ', emailResponse.response);
    return res.send(emailResponse);
  } else {
    return res.status(400).json({ message: 'Bad request' });
  }
};

export { emailRoute };
