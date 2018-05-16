/**
 * 
 * @author bubao
 * @date  2018-02-13
 * @description
 *
 */
// const imgsrc = 'https://pic1.zhimg.com/';
const { _, request } = require('../config/commonModules.js');
const utils = require('../config/utils.js');
const API = require('../config/api.js');

/**
 * 通用方法
 * @param {string||number} ID 传入ID
 * @param {string} api 传入api
 * @param {string} countName 传入countName
 * @param {Function} infoMethod 传入方法
 */
const universalMethod = (ID, api, countName, infoMethod) => {
	const url = _.template(api)({ postID: ID, columnsID: ID });
	const count = infoMethod(ID).then((c) => {
		return c[countName];
	});
	return new Promise((resolve) => {
		count.then(res1 => {
			utils.loopMethod(_.assign({
				options: {
					urlTemplate: url,
				}
			}, utils.rateMethod(res1, 20)), (res2) => {
				resolve(res2);
			});
		});
	});

};

/**
 * 知乎专栏信息
 * @param {string} columnsID //专栏ID
 */
const zhuanlanInfo = async (columnsID) => {
	const urlTemplate = _.template(API.post.columns)({ columnsID });
	let object = {};
	object = {
		url: urlTemplate,
		gzip: true,
	};
	return JSON.parse((await request(object)).body);
}

/**
 * 所有关注者信息
 * @param {string} columnsID 专栏ID 
 */
const followers = (columnsID) => {
	return universalMethod(columnsID, API.post.followers, 'followersCount', zhuanlanInfo);
}
/**
 * 专栏所有post
 * @param {string} columnsID 专栏ID
 */
const zhuanlanPosts = (columnsID) => {
	return universalMethod(columnsID, API.post.page, 'postsCount', zhuanlanInfo);
};

/**
 * 知乎专栏信息
 * @param {number} postID //postID
 */
const postInfo = async (postID) => {
	const urlTemplate = _.template(API.post.info)({ postID });
	let object = {};
	object = {
		url: urlTemplate,
		gzip: true,
	};
	return JSON.parse((await request(object)).body);
}

/**
 * 专栏文章喜欢者的信息
 * @param {number} postID //postID
 */
const postLikers = (postID) => {
	return new Promise((resolve) => {
		universalMethod(postID, API.post.likers, 'likesCount', postInfo).then(res => {
			resolve(res);
		});
	});
}

/**
 * 专栏文章回复的信息
 * @param {number} postID //postID
 * @param {number} count //comments总数
 */
const postComments = (postID, count) => {
	const url = _.template(API.post.comments)({ postID });
	return new Promise((resolve) => {
		return utils.loopMethod(_.assign({
			options: {
				urlTemplate: url,
			}
		}, utils.rateMethod(count, 20)), (res => {
			resolve(res);
		}));
	});
}

module.exports = {
	zhuanlanInfo,
	zhuanlanPosts,
	followers,
	postInfo,
	postLikers,
	postComments,
};