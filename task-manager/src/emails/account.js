const sendgridKey = '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';

const sgMail = require('@sendgrid/mail');

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
sgMail.setApiKey(sendgridKey);
const msg = {
  to: 'alexanderh@stunlockstudios.com',
  from: 'alexanderh@stunlockstudios.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);