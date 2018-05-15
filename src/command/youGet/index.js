/**
 * @author bubao 
 * @description 
 * @date: 2018-03-16
 * @Last Modified by: bubao 
 * @Last Modified time: 2018-05-15 19:08:56 
 */
const Bilibili = require('../../extractors/bilibili')
const path = require('path');

function youGet(params) {
	const { url, out } = params;
	if (url.indexOf('bilibili.com') > 0) {
		Bilibili(url, path.resolve(out || './'));
	}
}

module.exports = youGet;