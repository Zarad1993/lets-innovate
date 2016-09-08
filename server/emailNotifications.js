'use strict';
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport ({
	service: 'hotmail',
	auth: {
		user: 'lets-innovate@outlook.com',
		pass: process.env.password
	}
}));

module.exports = function(mailOptions) {
	mailOptions.from = 'Feature Request <lets-innovate@gmail.com>';
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Message sent: ' + info.response);
		}
	});
};
