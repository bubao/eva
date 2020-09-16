/**
 * @Description:
 * @Author: bubao
 * @Date: 2018-03-14 17:01:06
 * @LastEditors: bubao
 * @LastEditTime: 2020-09-16 17:36:40
 */

const Zhuanlan = require("zhihu-zhuanlan");
const ProgressBar = require("../../modules/ProgressBar");
const { mkdir } = require("../../tools/utils");
const { console, path, figlet } = require("../../tools/commonModules");
const fs = require("fs");
const stream = require("stream");

const writeFile = (path, data, format, cb = () => undefined) => {
	const s = new stream.Readable();
	s._read = () => {
		return undefined;
	};
	s.push(data);
	s.push(null);
	s.pipe(fs.createWriteStream(`${path}.${format}`)).on("close", cb);
};
/**
 *  知乎专栏抓取器
 * @param {string} postID 知乎专栏的ID
 * @param {string} localPath 下载路径
 * @param {string} format 格式，可省略
 */
async function Post(postID, localPath, format = "md") {
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

	const zhuanlan = Zhuanlan.init({ columnsID: postID });
	let title;
	zhuanlan.once("info", data => {
		title = data.title;
		mkdir(path.resolve(localPath, title), title);
	});
	const pb = ProgressBar.init();
	let write_count = 0;
	zhuanlan.on("batch_data", element => {
		element.data.map(
			({ filenameTime, header, content, copyRight, json }) => {
				writeFile(
					`${localPath}/${title}/${filenameTime}`,
					header + content + copyRight,
					"md",
					() => {
						write_count++;
						pb.render({
							completed: write_count,
							total: element.articles_count,
							hiden: false,
							type: true
						});
					}
				);
				if (format === "json") {
					writeFile(
						`${localPath}/${title}/${filenameTime}`,
						JSON.stringify(json),
						format
					);
				}
			}
		);
	});
	zhuanlan.getAll(postID);
}

module.exports = Post;
