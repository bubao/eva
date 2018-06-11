/**
 * @author bubao
 * @description
 * @date: 2018-05-17 13:49:02
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-23 15:54:15
 */

const { request } = require('../config/commonModules');
const template = require('lodash/template');
const API = require('../config/api');
const { requestOpts, loopGet } = require('../config/utils');

const followers = async (urlToken, options) => {
	options.uri = template(API.user.followers)({ url_token: urlToken });
	const v = await loopGet(options);
	return v;
}
const follower = async (urlToken, options) => {
	options.uri = template(API.user.followers)({ url_token: urlToken });
	const v = await loopGet(options);
	return v;
}
/**
 * 通用方法
 * @param {string|number} urlToken 话题ID
 * @param {object} options 配置选项
 * @param {string} countName template名
 */
const universalMethod = async (urlToken, options, countName) => {
	if (options.headers) {
		const object = requestOpts({ url_token: urlToken }, options, API.user[countName]);
		return JSON.parse((await request(object)).body);
	}
	return false;
}
module.exports = {
	info: async (urlToken, options) => { return await universalMethod(urlToken, options, 'info') },
	followers,
	follower,
	zhuanlansFocus: async (urlToken, options) => { return await universalMethod(urlToken, options, 'zhuanlansFocus') },
}
