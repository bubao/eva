/**
 * @author bubao
 * @description Markdown 转换
 * @date: 2018-01-23
 * @Last Modified by: bubao
 * @Last Modified time: 2019-12-02 02:39:40
 */

const fs = require("fs");
const stream = require("stream");
const { console } = require("../../tools/commonModules");

const writeFile = (path, filename, data, format) => {
	const s = new stream.Readable();
	s._read = () => {};
	s.push(data);
	s.push(null);
	s.pipe(fs.createWriteStream(`${path}.${format}`)).on("close", () => {
		console.log(
			`${format === "json" ? "🍅" : "✅"}  ${filename}.${format}`
		);
	});
};

/**
 * 知乎专栏文章保持本地
 * markdown(path, postId, res)
 * @param {string} path 下载地址
 * @param {string} postId 知乎专栏ID
 * @param {string} zhihuJson 知乎专栏的内容
 * @param {string} format 是否保留json
 */
const markdown = (path, dirName, element, format) => {
	const { filename, header, content, copyRight, json } = element;
	writeFile(
		`${path}/${dirName}/${filename}`,
		filename,
		header + content + copyRight,
		"md"
	);
	if (format === "json") {
		writeFile(
			`${path}/${dirName}/${filename}`,
			filename,
			JSON.stringify(json),
			format
		);
	}
};

module.exports = markdown;
