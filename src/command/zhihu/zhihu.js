const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio')
const _ = require('lodash');
var https = require("https");
let md = require('../build/md.js')
var EventProxy = require('eventproxy');

/**
 * 知乎专栏爬虫
 */
module.exports = function zhihu(zhihuId, path) {
	console.log(`-----🐛 ${zhihuId} start -----`);
	fs.exists(`${path}/${zhihuId}`, function (exists) {
		if (exists)
			console.log(`⚓  ${zhihuId} 文件夹已经存在`);
		else {
			fs.mkdir(`${path}/${zhihuId}`, function (err) {
				if (err)
					console.error(err);
				console.log(`🤖 创建 ${zhihuId}文件夹成功`);
			})
		}
	});

	const url = `https://zhuanlan.zhihu.com/${zhihuId}`;

	function download(url, callback) {
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
	var ep = new EventProxy();
	download(url, function (dd) {
		if (dd) {
			var $ = cheerio.load(dd);
			var postsCount = JSON.parse($("textarea#preloadedState").text().replace(/"updated":new Date\("/g, `"updated": "`).replace(/\.000Z"\),/g, `.000Z",`)).columns[`${zhihuId}`].postsCount
			// fs.writeFileSync('./json.json', $("textarea#preloadedState").text().replace(/"updated":new Date\("/g, `"updated": "`).replace(/\.000Z"\),/g, `.000Z",`))
			loopdown(postsCount)
		}
	});


	function loopdown(postsCount) {
		// body...
		var posts = postsCount % 20;
		var writeTimes = 0;
		var times = (postsCount - posts) / 20;

		for (let i = 0; i <= times; i++) {
			var urlp = `https://zhuanlan.zhihu.com/api/columns/${zhihuId}/posts?limit=20&amp;offset=${i * 20}`;
			var writeStream = fs.createWriteStream(`${path}/${zhihuId}/${i}.json`, {
				autoClose: true
			});
			request(urlp).pipe(writeStream);

			writeStream.on('finish', function () {
				console.log(`📩  ${zhihuId}/${i}.json`)

				if (writeTimes === times) {
					ep.emit('got_file', times)
				}
				++writeTimes;
			});

		}
	}
	ep.all('got_file', () => md(path, zhihuId));
}