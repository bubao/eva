/**
 * @description: 将markdown的图片下载到本地
 * @author: bubao
 * @date:  2018-01-23 14:06:45
 * @last author: bubao
 * @last edit time: 2020-09-17 01:50:51
 */

const fs = require("fs");
const request = require("request");
const path = require("path");
// const mkdirp = require('mkdirp');
const { console } = require("../../tools/commonModules");

/**
 *
 * @param {string} p 下载路径
 * @param {string} name 下载路径的文件夹名
 * @param {*} arr 文件中的img url list
 * @param {function} cb callback函数
 */
const loop = (p, name, arr, cb) => {
	if (arr.length) {
		const item = arr.splice(0, 1);
		request(item)
			.pipe(fs.createWriteStream(`${p}/${name}/imgs/${path.basename(item)}`))
			.on("close", () => loop(p, name, arr, cb));
	} else {
		console.log("end");
		if (cb !== undefined) cb();
	}
};
/**
 *
 * @param {string} p 下载路径
 * @param {string} name 下载路径的文件夹名
 * @param {string} markdownPath markdown文件的路径
 * @param {func} cb callback函数
 */
const localImage = (p, name, markdownPath, cb) => {
	const md = fs.readFileSync(markdownPath, "utf8");
	const all = md.match(/!\[\]\(https.*?\)/g);
	loop(
		p,
		name,
		JSON.parse(
			JSON.stringify(all)
				.replace(/!\[\]\(/g, "")
				.replace(/\)/g, "")
		),
		cb
	);
};

module.exports = localImage;
