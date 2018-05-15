/**
 * 
 * @author bubao
 * @date  2018-5-13
 * @description
 *
 */
// const imgsrc = 'https://pic1.zhimg.com/';
const { _, request, cheerio, url } = require('../config/commonModules.js');
const utils = require('../config/utils.js');
let API = require('../config/api.js');

/**
 * 通用方法
 * @param {string||number} ID 传入ID
 * @param {string} API 传入api
 * @param {string} countName 传入countName
 * @param {Function} infoMethod 传入方法
 */
let universalMethod = (ID, API, countName, infoMethod) => {
	let url = _.template(API)({ postID: ID, columnsID: ID });
	let count = infoMethod(ID).then((c) => {
		return c[countName];
	});
	return new Promise((resolve, reject) => {
		count.then(res1 => {
			utils.loopMethod(_.assign({
				options: {
					urlTemplate: url,
				}
			}, utils.rateMethod(res1, 20)), function (res2) {
				resolve(res2);
			});
		});
	});

};

/**
 * 知乎专栏信息
 * @param {string} columnsID //专栏ID
 */
let zhuanlanInfo = async (columnsID) => {
	let urlTemplate = _.template(API.post.columns)({ columnsID });
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
let followers = (columnsID) => {
	return universalMethod(columnsID, API.post.followers, 'followersCount', zhuanlanInfo);
}
/**
 * 专栏所有post
 * @param {string} columnsID 专栏ID
 */
let zhuanlanPosts = (columnsID) => {
	return universalMethod(columnsID, API.post.page, 'postsCount', zhuanlanInfo);
};

/**
 * 知乎专栏信息
 * @param {number} postID //postID
 */
let postInfo = async (postID) => {
	let urlTemplate = _.template(API.post.info)({ postID });
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
let postLikers = (postID) => {
	return new Promise((resolve, reject) => {
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
let postComments = (postID, count) => {
	let url = _.template(API.post.comments)({ postID });
	let object = {};
	return new Promise((resolve, reject) => {
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