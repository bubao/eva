'use strict';

let nodemailer = require('nodemailer');

async function email(createTransport, mailOptions) {
	let transporter = nodemailer.createTransport(createTransport);
	if (mailOptions.markdown.length) {
		let markdown = require('nodemailer-markdown').markdown;
		transporter.use('compile', markdown());
	}

	return await new Promise((resolve, reject) => {
		console.log(mailOptions)
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				reject(error);
			}
			resolve(info);
		});
	});
}
module.exports = email;