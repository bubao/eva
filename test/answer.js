/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-06-28 18:09:27
 * @LastEditors: bubao
 * @LastEditTime: 2020-06-28 18:11:07
 */
const inquirer = require("inquirer");
inquirer
	.prompt([
		{
			type: "password",
			name: "password",
			message: "Input your password:",
			mask: true
		}
	])
	.then(function(answers) {
		// password = answers.password;
		console.log(answers.password);
	})
	.catch(function() {});
