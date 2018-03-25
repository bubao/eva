const Bilibili = require('../../extractors/bilibili')
const path = require('path');

function youGet(params) {
	let { url,out} = params;
	if (url.indexOf('bilibili.com') > 0) {
		Bilibili(url, path.resolve(out || './'));
	}
}

module.exports = youGet;