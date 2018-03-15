const { path, _, request, fs, JSDOM } = require('../../tools/commonModules');
const { mkdir, getTrueURL, fileName } = require('../../tools/utils');
let NodeDown = require('../../modules/NodeDown');

function download(params) {
	let { url, name, description, length, out, hiden } = params;
	name = fileName(path.basename(name || url));
	new NodeDown({
		bar_length: length,
		description
	}).download({
		url,
		name,
		hiden
	});
}

module.exports = download;
