const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio')
const _ = require('lodash');
// const h2m = require('h2m')
const imgsrc = '![](https://pic1.zhimg.com/';
const https = require("https");
const EventProxy = require('eventproxy');
const ep = new EventProxy();
/**
 * 知乎专栏爬虫
 */


function getPostsCount(url, callback) {
	https.get(url, function (res) {
		var dd = "";
		res.on('data', function (chunk) {
			dd += chunk;
		});
		res.on("end", function () {
			callback(dd);
		});
	}).on("error", function () {
		callback(null);
	});
}

function loop(object) {
	// body...
	let urlp = object.urlp + object.writeTimes * 20;
	console.log(urlp)
	request(urlp, (error, response, body) => {
		if (error) {
			throw new Error(error);
		}

		_.forEach(JSON.parse(body), (item, index) => {
			object.allObject[index + object.writeTimes * 20] = item;
		});
		object.writeTimes = object.writeTimes + 1;
		if (object.writeTimes === object.times) {
			ep.emit('got_file', object.allObject);
		} else {
			loop(object);
		}
	});
}

module.exports = function zhihu(zhihuId) {
	const homeUrl = `https://zhuanlan.zhihu.com/${zhihuId}`;

	let allObject = {};
	getPostsCount(homeUrl, (dd) => {
		if (dd) {
			let $ = cheerio.load(dd);
			let postsCount = JSON.parse($("textarea#preloadedState").text().replace(/"updated":new Date\("/g, `"updated": "`).replace(/\.000Z"\),/g, `.000Z",`)).columns[`${zhihuId}`].postsCount;
			let posts = postsCount % 20;
			let writeTimes = 0;
			let times = (postsCount - posts) / 20;
			let urlp = `https://zhuanlan.zhihu.com/api/columns/${zhihuId}/posts?limit=20&amp;offset=`;
			loop({ postsCount: postsCount, zhihuId: zhihuId, writeTimes: writeTimes, times: times, urlp: urlp, allObject: allObject });
		}
	});

	return new Promise((resolve, reject) => {
		ep.all('got_file', (response) => {
			resolve(JSON.parse(JSON.stringify(response).replace(/\!\[\]\(/g, imgsrc)));
		})
	}).then(res => {
		return res;
	})
}