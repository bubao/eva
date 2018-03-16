// https://interface.bilibili.com/playurl?cid=6689771&otype=&player=1&quality=2&ts=1521131667&sign=dde4c12bdb85dfeefbfdb1b215383488

let { getTrueURL } = require('../tools/utils');
/**
 * 
 * @param {string} url 
 * @param {object} params 
 */
module.exports = function bilibili(url, params) {
	return getTrueURL(url, params);
}

let url = bilibili('https://interface.bilibili.com/playurl', {
	cid: 6689771,
	otype: 'json',
	player: 1,
	quality: 2,
	ts: new Date().valueOf() / 1000,
	sign: 'dde4c12bdb85dfeefbfdb1b215383488'
});