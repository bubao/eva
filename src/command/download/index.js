const { path, _, request, fs, JSDOM } = require('../../tools/commonModules');
const { getTrueURL, fileName,defaultName } = require('../../tools/utils');
let NodeDown = require('../../modules/NodeDown');

function download(params) {
	let { url, name, description, length, out, hiden } = params;
	name = fileName(path.basename(name || url), defaultName(url));
	new NodeDown({
		bar_length: length,
		description: description||'下载进度'
	}).download({
		url,
		name,
		out,
		hiden
	});
}

module.exports = download;
