const { path } = require('../../tools/commonModules');
const { fileName, defaultName } = require('../../tools/utils');
const NodeDown = require('../../modules/NodeDown');

function download(params) {
	let { name } = params;
	const { url, description, length, out, hiden } = params;
	name = fileName(path.basename(name || url), defaultName(url));
	new NodeDown({
		bar_length: length,
		description: description || '下载进度'
	}).download({
		url,
		name,
		out,
		hiden
	});
}

module.exports = download;
