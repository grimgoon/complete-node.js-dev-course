const sendgridKey = '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';

const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(sendgridKey);
const sendWelcomeEmail = (email,name) => {
    const msg = {
        to: 'alexanderh@stunlockstudios.com',
        from: 'alexanderh@stunlockstudios.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      sgMail.send(msg);
}


module.exports = {
    sendWelcomeEmail   
}