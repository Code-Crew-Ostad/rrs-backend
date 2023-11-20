var nodemailer = require('nodemailer');
const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.techromy.com',
        port: 25,
        secure: false,
        auth: {user: "info@techromy.com", pass: 'ZmzKt4RfOd'},
        tls: {rejectUnauthorized: false},
    });

    let mailOptions = {
        from: 'Restaurant Reservation System <info@techromy.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return  await transporter.sendMail(mailOptions)
}
module.exports=SendEmailUtility