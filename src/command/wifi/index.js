/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-06-28 15:06:22
 * @last author: bubao
 * @last edit time: 2021-01-13 18:52:07
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

async function wifi() {
	const prompt = [
		{
			type: "input",
			name: "ssid",
			message: "Input your wifi name:"
		},
		{
			type: "confirm",
			name: "hide",
			message: "Is it a hidden wifi？",
			default: false
		}, {
			type: "password",
			name: "password",
			message: "Input your password:",
			default: undefined,
			mask: true
		}, {
			type: "rawlist",
			name: "wifi_type",
			choices: ["WPA", "WEP"],
			message: "Which type of wifi?:",
			when(answers) {
				return answers.password;
			}
		}
	];
	const answers = await inquirer.prompt(prompt);
	const { ssid, password, wifi_type, hide } = answers;

	qrcode(`WIFI:T:${wifi_type || "nopass"}${password ? ";P:" + escape(password) : ""};S:${escape(ssid)}${hide ? ";H:true" : ""};`);
}

module.exports = wifi;
