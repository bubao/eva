/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-06-28 15:06:22
 * @last author: bubao
 * @last edit time: 2021-01-12 00:19:42
 */
const qrcode = require("../qrcode");
const inquirer = require("inquirer");

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

async function wifi(ssid, password) {
	if (ssid === undefined) {
		const result = await inquirer
			.prompt([
				{
					type: "input",
					name: "ssid",
					message: "Input your wifi name:"
				},
				{
					type: "password",
					name: "password",
					message: "Input your password:",
					default: undefined,
					mask: true
				}
			]);
		ssid = result.ssid;
		password = result.password;
	}
	let wifi_type = "nopass";
	if (password) {
		wifi_type = await inquirer.prompt([{
			type: "rawlist",
			name: "wifi_type",
			choices: ["WPA", "WEP"],
			message: "Input your wifi type:"
		}]).then(function(answers) {
			return answers.wifi_type;
		});
	}

	const _ssid = escape(ssid);
	const _password = escape(password);
	qrcode(`WIFI:T:${wifi_type};S:${_ssid};P:${_password};;`);
}

module.exports = wifi;
