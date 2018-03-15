const { path, _, request, fs, JSDOM } = require('../../tools/commonModules');
const { getTrueURL, fileName, parseURL } = require('../../tools/utils');
let NodeDown = require('../../modules/NodeDown');

function youGet(params) {
	let { url, name, description, length } = params;

	params.name = fileName(path.basename(name || parseURL(url).pathname), parseURL(url).pathname);
	new NodeDown({
		bar_length: length,
		description
	}).download(params);
}

module.exports = youGet;