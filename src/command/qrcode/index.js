/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-12-23 18:40:02
 * @LastEditors: bubao
 * @LastEditTime: 2020-06-28 15:43:00
 */
// const chalk = require("chalk");
const QRCode = require("qrcode");
const { clicolor } = require("../../tools/commonModules");

function qrcode(str) {
	QRCode.toString(str, (err, str) => {
		if (err) {
			console.log(`Generate qrcode error: ${clicolor.red.bold(err)}.`);
			return;
		}
		console.log(clicolor.blue(str));
	});
}

module.exports = qrcode;
