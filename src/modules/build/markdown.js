/**
 * @author bubao
 * @description
 * @date: 2018-01-23
 * @Last Modified by: bubao
 * @Last Modified time: 2019-03-24 01:00:06
 */

const fs = require('fs');
const stream = require('stream');
const { console } = require('../../tools/commonModules');

const writeFile = (path, filename, data, format) => {
	const s = new stream.Readable();
	s._read = () => {};
	s.push(data);
	s.push(null);
	s.pipe(fs.createWriteStream(`${path}.${format}`)).on('close', () => {
		console.log(`${format === 'json' ? '🍅' : '✅'}  ${filename}.${format}`);
	});
};

/**
 * 知乎专栏HTML2MD
 * markdown(path, postId, res)
 * @param {string} path 下载地址
 * @param {string} postId 知乎专栏ID
 * @param {string} zhihuJson 知乎专栏的内容
 * @param {string} format 是否保留json
 */
const markdown = (path, postId, zhihuJson, format) => {
	zhihuJson.MarkDown.forEach(element => {
		const { filename, header, content, copyRight, json } = element;
		writeFile(
			`${path}/${postId}/${filename}`,
			filename,
			header + content + copyRight,
			'md',
		);
		if (format === 'json') {
			writeFile(
				`${path}/${postId}/${filename}`,
				filename,
				JSON.stringify(json),
				format,
			);
		}
	});
};

module.exports = markdown;
