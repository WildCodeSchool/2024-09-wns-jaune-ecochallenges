import nodemailer from 'nodemailer';

const { GOOGLE_APP_PASSWORD, GOOGLE_APP_EMAIL } = process.env;

const getTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GOOGLE_APP_EMAIL,
      pass: GOOGLE_APP_PASSWORD?.replace(/_/g, ' '),
    },
  });
};

export const transporter = getTransporter();
