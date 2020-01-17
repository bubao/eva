/**
 * @Description:
 * @Author: bubao
 * @Date: 2018-03-14 17:01:06
 * @LastEditors: bubao
 * @LastEditTime: 2020-01-17 12:09:26
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
	await new Promise(resolve => {
		figlet.text(
			`${postID}`,
			{
				font: "Ghost",
				horizontalLayout: "default",
				verticalLayout: "default"
			},
			(err, data) => {
				if (!err) {
					console.log(data);
				}
				resolve();
			}
		);
	});

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
