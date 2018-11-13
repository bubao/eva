/**
 * @author bubao
 * @description
 * @date: 2018-02-13
 * @Last Modified by: bubao
 * @Last Modified time: 2018-11-13 20:05:58
 */

const api = require('./api.js');
const assign = require('lodash/assign');
const template = require('lodash/template');
const ProgressBar = require('../../ProgressBar');
const { loopMethod, rateMethod } = require('./utils.js');
const { request, on } = require('self-promise-request');
const Ora = require("ora")

const pb = new ProgressBar();
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
	const spinner = new Ora({
		text: `It's Running!`,
		spinner: {
			interval: 80,
			frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
		}
	}).start();
	// const interval = setInterval(() => {
	// 	spinner.succeed(`It's OK!`)
	// }, 100);
	return new Promise((resolve) => {
		loopMethod(
			assign(
				{
					options: {
						urlTemplate,
					}
				},
				rateMethod(count, 20)
			), resolve, spinner);
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
		uri: urlTemplate,
		gzip: true,
	};

	return new Promise((resolve) => {
		request(object).then((data) => {
			resolve(JSON.parse(data.body));
		});
	});
}
/**
 * 专栏所有post
 * @param {string} columnsID 专栏ID
 */
const zhuanlanPosts = (columnsID) => {
	return universalMethod(columnsID, api.post.page, 'postsCount', zhuanlanInfo);
};

module.exports = zhuanlanPosts;
