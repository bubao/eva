/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-06-28 15:06:22
 * @last author: bubao
 * @last edit time: 2021-01-12 21:00:39
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
	let answers = {};
	if (ssid === undefined) {
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
		answers = await inquirer.prompt(prompt);
		ssid = answers.ssid;
		password = answers.password;
	}

	qrcode(`WIFI:T:${answers.wifi_type || "nopass"}${answers.wifi_type || password ? ";P:" + escape(password) : ""};S:${escape(ssid)}${answers.hide ? ";H:true" : ""};`);
}

module.exports = wifi;
