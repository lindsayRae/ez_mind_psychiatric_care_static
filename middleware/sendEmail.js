import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// configure the package
dotenv.config();

const emailPass = process.env.nodemailer_pass;
const emailUser = process.env.nodemailer_user;
const emailDestination = process.env.nodemailer_destination_email;
const emailService = process.env.nodemailer_email_service;
const emailSubject = process.env.nodemailer_subject;
const environment = process.env.node_env;

const CONTACT_MESSAGE_FIELDS = {
  name: 'Name',
  email: 'Email',
  message: 'Message',
};

const sendEmail = async (messageObj) => {
  let subject;

  const stringData = Object.entries(messageObj).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val}\n\n`),
    ''
  );

  if (environment != 'production') {
    subject = 'test subject from dev';
  } else if (environment === 'production') {
    // fill in later
    // eventually I will want all the data as an object
    subject = emailSubject;
  }

  const transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: emailUser,
    to: emailDestination,
    subject: subject,
    text: stringData,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('In catch');
    return error;
  }
};
export { sendEmail };
