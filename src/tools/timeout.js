/**
 * @author bubao
 * @description
 * @date: 2018-05-21 16:48:28
 * @Last Modified by: bubao
 * @Last Modified time: 2019-12-01 00:23:03
 */
const ora = require("ora");

function timeout(ms = 1000, times = 0) {
	const spinner = ora({
		text: `wait 0/${parseInt(ms, 10)} seconds`,
		spinner: {
			interval: 80,
			frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
		},
		color: "cyan"
	}).start();

	let timesRun = 0;
	return new Promise(resolve => {
		const interval = setInterval(() => {
			timesRun += 1;
			// ? 动态更新文字
			spinner.text = `wait ${parseInt(timesRun / 10, 10)}/${parseInt(
				ms / 1000,
				10
			)} seconds`;
			if (timesRun >= parseInt(ms / 100, 10)) {
				spinner.succeed(` succeed ${(times += 1)}`);
				clearInterval(interval);
				resolve();
			}
		}, 100);
	});
}

module.exports = timeout;
