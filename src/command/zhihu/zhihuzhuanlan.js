const fs = require('fs');
const request = require('request');
const _ = require('lodash');
let path = require('path');
let { JSDOM } = require('jsdom');
let markdown = require('../build/markdown');
const { URL, URLSearchParams } = require('url');

/**
 *  知乎专栏抓取器
 * @param {string} zhihuzhuanlanId 知乎专栏的ID
 * @param {string} localPath 下载路径
 * @param {string} format 格式，可省略
 */
let zhihuzhuanlan = (zhihuzhuanlanId, localPath, format) => {
	this.format = format;
	console.log(`-----🐛 ${zhihuzhuanlanId} start -----`);
	mkdir(zhihuzhuanlanId, localPath);
	const url = `https://zhuanlan.zhihu.com/${zhihuzhuanlanId}`;
	request.get(url, (err, response, body) => {
		if (err) {
			throw err;
		}
		let dom = new JSDOM(body);
		const { document } = dom.window;
		let correctJson = document.querySelector('textarea#preloadedState')
			.textContent
			.replace(/"updated":new Date\("/g, `"updated": "`)
			.replace(/\.000Z"\),/g, `.000Z",`);
		let postsCount = JSON.parse(_.trim(correctJson)).columns[`${zhihuzhuanlanId}`].postsCount;
		loopdown(postsCount, zhihuzhuanlanId, localPath);
	});
};

/**
 * mkdir
 * @param {string} name dir名
 * @param {string} localPath dir路径
 */
function mkdir(name, localPath) {
	let filePath = path.resolve(localPath, name);
	fs.exists(filePath, (exists) => {
		if (exists) {
			console.log(`⚓  ${name} 文件夹已经存在`);
		} else {
			fs.mkdir(filePath, (err) => {
				if (err) {
					console.error(err);
				}
				console.log(`🤖 创建 ${name}文件夹成功`);
			});
		}
	});
}

/**
 * 第二层循环下载器
 * @param {number} postsCount 文章数量
 * @param {string} zhihuzhuanlanId 知乎专栏的ID
 * @param {string} localPath 下载路径
 */
let loopdown = (postsCount, zhihuzhuanlanId, localPath) => {
	let posts = postsCount % 20;
	let writeTimes = 0;
	let times = (postsCount - posts) / 20;
	for (let i = 0; i <= times; i++) {
		let url = getTrueURL(`https://zhuanlan.zhihu.com/api/columns/${zhihuzhuanlanId}/posts`, { limit: 20, offset: i });
		let filePath = path.join(localPath, zhihuzhuanlanId, i + '.json');

		let writeStream = fs.createWriteStream(filePath, {
			autoClose: true
		});
		request.get(url).pipe(writeStream);
		writeStream.on('finish', () => {
			console.log(`📩  ${filePath}`);
			if (writeTimes === times) {
				markdown(localPath, zhihuzhuanlanId, this.format);
			}
			++writeTimes;
		});
	}
};
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

module.exports = zhihuzhuanlan;