/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-12-23 18:40:02
 * @last author: bubao
 * @last edit time: 2021-01-12 20:47:00
 */
// const chalk = require("chalk");
const QRCode = require("qrcode");
const { clicolor } = require("../../tools/commonModules");

function qrcode(str) {
	QRCode.toString(str, { type: "terminal" }, (err, str) => {
		if (err) {
			console.log(`Generate qrcode error: ${clicolor.red.bold(err)}.`);
			return;
		}
		console.log(str);
	});
}

module.exports = qrcode;
