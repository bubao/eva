/**
 * @author bubao
 * @description 话题
 * @date: 2018-05-17 12:15:31
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-22 21:29:47
 */

// const merge = require('lodash/merge');
const template = require('lodash/template');
const capitalize = require('lodash/capitalize');
const API = require('../config/api');
const { request, console } = require('../config/commonModules');
const { loopGet, requestOpts } = require('../config/utils');

const questions = async (topicID, options) => {
	options.uri = template(API.topic.topQuestion)({ topicID });
	const v = await loopGet(options);
	return v;
}

/**
 * 通用方法
 * @param {string|number} topicID 话题ID
 * @param {object} options 配置选项
 * @param {string} countName template名
 */
const universalMethod = async (topicID, options, countName) => {
	if (options.headers) {
		const { timeline } = options
		if (countName === 'question' || countName === 'activity') {
			countName = `${timeline ? `timeline` : `top`}${capitalize(countName)}`;
		}
		const object = requestOpts({ topicID }, options, API.topic[countName]);
		return JSON.parse((await request(object)).body);
	}
	console.error('lost headers');
	return false;
}

module.exports = {
	info: async (topicID, options) => { return await universalMethod(topicID, options, 'info') },
	parent: async (topicID, options) => { return await universalMethod(topicID, options, 'parent') },
	children: async (topicID, options) => { return await universalMethod(topicID, options, 'children') },
	organize: async (topicID, options) => { return await universalMethod(topicID, options, 'organize') },
	followers: async (topicID, options) => { return await universalMethod(topicID, options, 'followers') },

	questions,

	activity: async (topicID, options) => { return await universalMethod(topicID, options, 'activity') },
	topActivity: async (topicID, options) => { return await universalMethod(topicID, options, 'topActivity') },
	timelineActivity: async (topicID, options) => { return await universalMethod(topicID, options, 'timelineActivity') },
	question: async (topicID, options) => { return await universalMethod(topicID, options, 'question') },
	topQuestion: async (topicID, options) => { return await universalMethod(topicID, options, 'topQuestion') },
	timelineQuestion: async (topicID, options) => { return await universalMethod(topicID, options, 'timelineQuestion') },
	essence: async (topicID, options) => { return await universalMethod(topicID, options, 'essence') },
	bestAnswerers: async (topicID, options) => { return await universalMethod(topicID, options, 'bestAnswerers') },
};
