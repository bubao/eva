/**
 * @author bubao
 * @description 将markdown的图片下载到本地
 * @date: 2018-01-23
 * @Last Modified by: bubao
 * @Last Modified time: 2019-11-30 23:31:41
 */
const fs = require("fs");
const request = require("request");
const slice = require("lodash/slice");
const path = require("path");
const { console } = require("../../tools/commonModules");

/**
 *
 * @param {string} p 下载路径
 * @param {string} name 下载路径的文件夹名
 * @param {Array} arr 文件中的img url list
 * @param {func} cb callback函数
 */
const loop = (imgsPath, arr, cb) => {
	if (arr.length) {
		request(arr[0])
			.pipe(
				fs.createWriteStream(
					path.join(imgsPath, `${path.basename(arr[0])}`)
				)
			)
			.on("close", () => {
				loop(imgsPath, slice(arr, 1));
			});
	} else {
		console.log("end");
		if (cb !== undefined) {
			cb();
		}
	}
};
/**
 * markdown 文件图片下载本地
 * @param {string} imgsPath 下载路径的文件夹名
 * @param {string} markdownPath markdown文件的路径
 * @param {func} cb callback函数
 */
const localImage = (imgsPath, markdownPath, cb) => {
	const md = fs.readFileSync(markdownPath, "utf8");
	const all = md.match(/!\[\]\(https.*?\)/g);
	// const imgsPath = path.join(markdownPath.replace('.md', ''), 'imgs');
	// mkdirp(imgsPath);
	loop(
		imgsPath,
		JSON.parse(
			JSON.stringify(all)
				.replace(/!\[\]\(/g, "")
				.replace(/\)/g, "")
		),
		cb
	);
};

module.exports = localImage;
