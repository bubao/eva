/**
 * @author bubao
 * @description
 * @date: 2018-03-14
 * @Last Modified by: bubao
 * @Last Modified time: 2019-12-01 00:17:46
 */
const Ora = require("ora");
const zhuanlan = require("zhihu-zhuanlan");
const { mkdir } = require("../../tools/utils");
const markdown = require("../../modules/build/markdown");
const { console, path, figlet } = require("../../tools/commonModules");

/**
 *  知乎专栏抓取器
 * @param {string} postID 知乎专栏的ID
 * @param {string} localPath 下载路径
 * @param {string} format 格式，可省略
 */
async function Post(postID, localPath, format) {
	console.log(`-----🐛 ${postID} start -----`);
	console.log(
		figlet.textSync(`${postID}`, {
			font: "Ghost",
			horizontalLayout: "default",
			verticalLayout: "default"
		})
	);
	const spinner = new Ora({
		text: "It's Running!",
		spinner: {
			interval: 80,
			frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
		}
	});

	mkdir(path.resolve(localPath, postID), postID);
	markdown(localPath, postID, await zhuanlan(postID, spinner), format);
}

module.exports = Post;
