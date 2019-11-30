/**
 * @author bubao
 * @description 命令行下载器
 * @date: 2018-03-15 19:06:50
 * @Last Modified by: bubao
 * @Last Modified time: 2019-12-01 00:51:46
 */

const { path } = require("../../tools/commonModules");
const { fileName, defaultName } = require("../../tools/utils");
const NodeDown = require("../../modules/NodeDown");

async function download(params) {
	let { name } = params;
	const { url, description, length, out, hiden } = params;
	name = fileName(path.basename(name || url), defaultName(url));
	await NodeDown.init({
		bar_length: length,
		description: description || "下载进度"
	}).download({
		url,
		name,
		out,
		hiden
	});
}

module.exports = download;
