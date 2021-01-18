/**
 * @description: 更新
 * @author: bubao
 * @date: 2020-01-15 16:30:08
 * @last author: bubao
 * @last edit time: 2021-01-18 22:47:20
 */

const ora = require("ora");
const promisify = require("util").promisify;
const { path, fs } = require("../../tools/commonModules");
const exec = promisify(require("child_process").exec);
const WriteFile = promisify(fs.writeFile);

const Configuration = require("../../modules/Config/index");

/**
 * @description 更新版本
 * @author bubao
 * @date 2020-06-28
 * @param {string} sourcePath 项目路径
 * @returns
 */
async function update(sourcePath = "./") {
	// ? 获取配置文件路径
	sourcePath = path.resolve(sourcePath);
	// ? 初始化滚动条
	const spinner = ora({
		text: "开始更新",
		spinner: {
			interval: 80,
			frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
		},
		color: "cyan"
	}).start();
	const configuration = new Configuration();

	const source = await configuration.getAll(sourcePath);

	// 文件不存在则退出
	if (!source) {
		spinner.fail("更新失败，请重试");
		return;
	}
	spinner.text = "更新代码";

	process.on("SIGINT", () => {
		spinner.fail("User cancel");
		// eslint-disable-next-line no-process-exit
		process.exit(0);
	});
	// * 更新代码
	await exec(`cd ${source.source} && git pull`);

	const diffData = await configuration.isDiffs();
	if (!diffData) {
		spinner.text = "重装";
	} else {
		spinner.text = "更新依赖";
		await WriteFile(
			diffData.filename,
			diffData.data
		);
	}
	// spinner.start("更新依赖");
	// * 需要安装依赖
	await exec(`cd ${source.source} && cnpm i -g .`);
	spinner.succeed("更新成功");
	spinner.stop();
}

module.exports = update;
