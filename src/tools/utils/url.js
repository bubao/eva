const { URL, URLSearchParams } = require('url');
const _ = require('lodash');
/**
 * 获取url的参数
 * @param {number} offset 
 * @param {number} limit 
 */
let getURLParams = (params) => {
	let { offset, limit, ...other } = params
	limit = _.clamp(limit, 1, 20);
	offset = offset * limit !== NaN ? offset * limit : undefined;
	return {
		limit: limit,
		'amp;offset': offset,
		...other
	}
}

/**
 * 获取真实url
 * @param {string} url url
 * @param {object} params url参数object
 */
let getTrueURL = (url, params) => {
	url = new URL(url);
	url.search = new URLSearchParams(getURLParams(params));
	return url.toString();
}