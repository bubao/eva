/**
 * @author bubao
 * @description 命令行下载器
 * @date: 2018-03-15 19:06:50
 * @Last Modified by: bubao
 * @Last Modified time: 2019-12-01 00:51:46
 */

const path = require("path");
const { defaultName } = require("../../tools/utils");
const NodeDown = require("../../modules/NodeDown");
const fs = require("fs").promises;

async function download(params) {
	let { name } = params;
	const { url, description, length, out, hiden } = params;

	name = defaultName(url);
	const res = path.resolve(out, name);
	const state = await fs.stat(res).catch(() => {});
	const opts = {
		url,
		name,
		out,
		hiden
	};
	if (state) {
		opts.read = state.size;
	}
	await NodeDown.init({
		bar_length: length,
		description: description || "下载进度"
	}).download(opts);
}

module.exports = download;
