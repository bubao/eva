/**
 * @author bubao
 * @description
 * @date: 2018-01-23
 * @Last Modified by: bubao
 * @Last Modified time: 2018-11-23 00:27:11
 */

const fs = require('fs');
const TurndownService = require('turndown');
const { console } = require('../../tools/commonModules');

const Turndown = new TurndownService();

Turndown.addRule('indentedCodeBlock', {
	filter(node, options) {
		return (
			options.codeBlockStyle === 'indented' &&
			node.nodeName === 'PRE' &&
			node.firstChild &&
			node.firstChild.nodeName === 'CODE'
		);
	},
	replacement(content, node) {
		return `'\n\`\`\`${node.firstChild.getAttribute('class')}\n${content}\n\`\`\`\n`;
	}
});

const writeFile = (path, filename, data, format) => {
	fs.writeFile(`${path}.${format}`, data, 'utf8', (err) => {
		if (err) throw err;
		console.log(`${format === "json" ? "🍅" : "✅"}  ${filename}.${format}`);
	});
}

/**
 * 知乎专栏HTML2MD
 * markdown(path, postId, res)
 * @param {string} path 下载地址
 * @param {string} postId 知乎专栏ID
 * @param {string} zhihuJson 知乎专栏的内容
 * @param {string} format 是否保留json
 */

const markdown = async (path, postId, zhihuJson, format) => {
	zhihuJson.MarkDown.forEach(element => {
		const {
			filename,
			header,
			content,
			copyRight,
			json } = element;
		writeFile(`${path}/${postId}/${filename}`, filename, header + content + copyRight, "md");
		if (format === "json") {
			writeFile(`${path}/${postId}/${filename}`, filename, JSON.stringify(json), format);
		}
	});
}

module.exports = markdown;
