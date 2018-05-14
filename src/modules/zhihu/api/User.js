/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
'use strict';
const { request, cheerio, _ } = require('../config/commonModules');
const utils = require('../config/utils.js');
// const config = require('../config');
const config = utils.getConfig();
const API = require('../config/api');

function formatFollowData(str) {
	if (str.indexOf('K') !== -1) {
		return parseInt(str) * 1000;
	}
	// if (str.indexOf('K') !== -1) {   return parseInt(str) * 10000; }
	return parseInt(str);
}

/*
 * @param name  The name of Zhihu user
 * @return      A promise
 */
let info = (qID) => {
	// let data = {
	// 	url: API.user.info,
	// 	qs: {
	// 		params: JSON.stringify({ 'url_token': name })
	// 	}
	// };
	// return request(data).then(function (content) {
	// 	let responseBody = content.body;
	// 	let $ = cheerio.load(responseBody);
	// 	let values = $('span.value');
	// 	let result = {
	// 		answer: formatFollowData(values.eq(0).text()),
	// 		post: formatFollowData(values.eq(1).text()),
	// 		follower: formatFollowData(values.eq(2).text())
	// 	};
	// 	result.profileUrl = config.zhihu + $('a.avatar-link').attr('href');
	// 	result.name = $('span.name').text();
	// 	let male = $('.icon-profile-female');
	// 	result.sex = male.length === 1
	// 		? 'female'
	// 		: 'male';
	// 	return result;
	// });
	let urlTemplate = _.template(API.user.info)({ qID });
	let object = { uri: urlTemplate, headers: config.headers };
	return request(object).then(content => {
		let responseBody = content.body;
		let $ = cheerio.load(responseBody);
		let values = $('#data').attr('data-state');
		const avator_url = $('.ProfileHeader-main > img.Avatar.Avatar--large.UserAvatar-inner').attr('src');
		const UserName = $('.ProfileHeader-main .ProfileHeader-name').text();
		const headline = $('.ProfileHeader-main  .RichText.ProfileHeader-headline').text();
		const sex = $('.icon-profile-female').length === 1
			? 'female'
			: 'male';
		return values;
	});

};

let questions = (qID) => { };

let answers = (qID) => { };

let zhuanlansFocus = (qID, count) => {
	let urlTemplate = _.template(API.user.zhuanlansFocus)({ qID });
	let object = {};
	return new Promise((resolve, reject) => {
		return utils.loopMethod(_.assign({
			options: {
				urlTemplate,
				headers: config.headers
			}
		}, utils.rateMethod(count, 20)), (res => {
			resolve(res);
		}));
	});
};

let topic = () => { };

module.exports = {
	info,
	// TODO
	zhuanlansFocus,
	questions,
	answers,
	topic,

	// Deprecated
	getUserByName: info
};