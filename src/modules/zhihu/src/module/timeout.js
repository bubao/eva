/**
 * @author bubao
 * @description
 * @date: 2018-05-21 16:48:28
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-22 12:33:48
 */
const ora = require('ora');

let count = 0;
function timeout(ms, init) {
	const spinner = ora({
		text: `wait 0/${parseInt(ms, 10)} seconds`,
		spinner: {
			interval: 80,
			frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
		}
	}).start();
	let timesRun = 0;
	count = init ? 0 : count;
	return new Promise((resolve) => {
		const interval = setInterval(() => {
			timesRun += 1;
			spinner.text = `wait ${parseInt(timesRun / 10, 10)}/${parseInt(ms / 1000, 10)} seconds`
			if (timesRun === parseInt(ms / 100, 10)) {
				spinner.succeed(` succeed ${count += 1}`);
				resolve();
				clearInterval(interval);
			}
			// do whatever here..
		}, 100);
	});
}
module.exports = timeout;
