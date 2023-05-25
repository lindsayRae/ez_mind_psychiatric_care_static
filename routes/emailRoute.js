import { sendEmail } from '../middleware/sendEmail.js';

const emailRoute = async (req, res) => {
  // All data should be cleaned here before you send it to your middleware
  // Security should be applied here before you send it to your middleware

  let emailObj = req.body;
  console.log('emailObj: ', emailObj);
  let emailResponse = await sendEmail(emailObj);
  console.log('NODEMAILER RES: ', emailResponse.response);
  res.send(emailResponse);
};

export { emailRoute };
