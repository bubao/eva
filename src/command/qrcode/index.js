/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-12-23 18:40:02
 * @LastEditors: bubao
 * @LastEditTime: 2019-12-23 18:46:51
 */
// const chalk = require("chalk");
const QRCode = require("qrcode");
// const { parse } = require("url");
const { clicolor } = require("../../tools/commonModules");

function qrcode(str) {
	// const { protocol } = parse(url);
	// const website = protocol ? url : `http://${url}`;
	QRCode.toString(str, (err, str) => {
		if (err) {
			console.log(`Generate qrcode error: ${clicolor.red.bold(err)}.`);
			return;
		}
		console.log(clicolor.blue(str));
	});
}
module.exports = qrcode;
