var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport ({
	service: 'hotmail',
	auth: {
		user: 'lets-innovate@outlook.com',
		// TODO Add an environment that holds a password on deployment
		pass: ''
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
