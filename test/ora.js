/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-01-17 16:16:36
 * @LastEditors: bubao
 * @LastEditTime: 2020-01-17 16:59:42
 */
const ora = require("ora");

const Init = ora({
	text: "开始更新",
	spinner: {
		interval: 80,
		frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
	},
	color: "cyan"
});

const one = Init.start("one start");
setTimeout(() => {
	one.text = "one change";
	one.succeed("更新成功");
	const two = Init.start("two start");
	setTimeout(() => {
		two.text = "two change";
		two.fail("更新成功");
	}, 3000);
}, 1000);
