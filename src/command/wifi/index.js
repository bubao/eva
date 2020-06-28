/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-06-28 15:06:22
 * @LastEditors: bubao
 * @LastEditTime: 2020-06-28 15:33:59
 */
const qrcode = require("../qrcode");
const escape = v => {
	// eslint-disable-next-line quotes
	const needsEscape = ['"', ";", ",", ":", "\\"];

	let escaped = "";
	for (let i = 0; i < v.length; i++) {
		let c = v[i];
		if (needsEscape.includes(c)) {
			c = "\\" + c;
		}
		escaped += c;
	}

	return escaped;
};

function wifi(ssid, password) {
	const _ssid = escape(ssid);
	const _password = escape(password);
	qrcode(`WIFI:T:WPA;S:${_ssid};P:${_password};;`);
}

module.exports = wifi;
