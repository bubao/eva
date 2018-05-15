/**
 * @author bubao 
 * @description email
 * @date: 2018-03-26
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-15 18:48:31
 */
const nodemailer = require('nodemailer');
const { console } = require('../../tools/commonModules');
const { markdown } = require('nodemailer-markdown');

async function email(createTransport, mailOptions) {
	const transporter = nodemailer.createTransport(createTransport);
	if (mailOptions.markdown.length) {
		transporter.use('compile', markdown());
	}

	const value = await new Promise((resolve, reject) => {
		console.log(mailOptions)
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				reject(error);
			}
			resolve(info);
		});
	});
	return value;
}
module.exports = email;