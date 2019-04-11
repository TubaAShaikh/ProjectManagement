var nodemailer = require('nodemailer');

module.exports = function (to,subject,message) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jwskyairlines@gmail.com',
            pass: 'NOOBU13121997'
        }
    });

    var mailOptions = {
        from: 'jwskyairlines@gmail.com',
        to: to,
        subject: subject,
        text: message
    };

    console.log('*****************sending mail',mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('error sending mail:',error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

};