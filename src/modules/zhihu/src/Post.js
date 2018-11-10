/**
 * @author bubao
 * @description
 * @date: 2018-02-13
 * @Last Modified by: bubao
 * @Last Modified time: 2018-11-11 01:36:59
 */

const api = require('./api.js');
const assign = require('lodash/assign');
const template = require('lodash/template');
const { loopMethod, rateMethod } = require('./utils.js');
const { request } = require('../../../tools/commonModules.js');

/**
 * 通用方法
 * @param {string||number} ID 传入ID
 * @param {string} API 传入api
 * @param {string} countName 传入countName
 * @param {Function} infoMethod 传入方法
 */
const universalMethod = async (ID, API, countName, infoMethod) => {
	const urlTemplate = template(API)({ postID: ID, columnsID: ID });
	const count = (await infoMethod(ID))[countName];
	return new Promise((resolve) => {
		loopMethod(
			assign(
				{
					options: {
						urlTemplate,
					}
				},
				rateMethod(count, 20)
			), resolve);
	});

};

/**
 * 知乎专栏信息
 * @param {string} columnsID //专栏ID
 */
const zhuanlanInfo = async (columnsID) => {
	const urlTemplate = template(api.post.columns)({ columnsID });
	let object = {};
	object = {
		url: urlTemplate,
		gzip: true,
	};
	return JSON.parse((await request(object)).body);
}
/**
 * 专栏所有post
 * @param {string} columnsID 专栏ID
 */
const zhuanlanPosts = (columnsID) => {
	return universalMethod(columnsID, api.post.page, 'postsCount', zhuanlanInfo);
};

module.exports = zhuanlanPosts;
