/**
 * @author bubao
 * @description
 * @date: 2018-03-14
 * @Last Modified by: bubao
 * @Last Modified time: 2019-12-02 03:07:30
 */
const Zhuanlan = require("zhihu-zhuanlan");
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

	const zhuanlan = Zhuanlan.init();
	let title;
	zhuanlan.once("info", data => {
		title = data.title;
		mkdir(path.resolve(localPath, title), title);
	});
	zhuanlan.on("single_data", data => {
		markdown(localPath, title, data, format);
	});
	zhuanlan.getAll(postID);
}

module.exports = Post;
