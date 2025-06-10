import nodemailer from 'nodemailer';

const { GOOGLE_APP_PASSWORD, GOOGLE_APP_EMAIL } = process.env;

const getTransporter = () => {
  console.log(GOOGLE_APP_EMAIL, GOOGLE_APP_PASSWORD);
  console.log(GOOGLE_APP_PASSWORD?.replace(/_/g, ' '));
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GOOGLE_APP_EMAIL,
      pass: GOOGLE_APP_PASSWORD?.replace(/_/g, ' '),
    },
  });
};

export const transporter = getTransporter();
