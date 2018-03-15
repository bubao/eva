const { path, _, request, fs, JSDOM } = require('../../tools/commonModules');
const { mkdir, getTrueURL } = require('../../tools/utils');
let NodeDown = require('../../modules/NodeDown');
// new NodeDown({ bar_length: 50, description: '进度' }).download({
// 	url: 'https://www.npmjs.com/package/cli-color',
// 	name: 'typora-setup-x64.exe'
// });

function download(params) {
	let { url, options } = params;
	let name = path.basename(options.name || options.url);
	console.log(name);
}

module.exports = download;
