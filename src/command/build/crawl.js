const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio')
const _ = require('lodash');
const h2m = require('h2m');
// const imgsrc = '![](https://pic1.zhimg.com/';
let https = require("https");
let md = require('./md.js');
let EventProxy = require('eventproxy');

/**
 * 知乎专栏爬虫
 */
module.exports = crawl = (zhihuId, path, format) => {
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

	let download = (url, callback) => {
		https.get(url, function (res) {
			let dd = "";
			res.on('data', (chunk) => {
				dd += chunk;
			});
			res.on("end", () => {
				callback(dd);
			});
		}).on("error", () => {
			callback(null);
		});
	}
	let ep = new EventProxy();
	download(url, (dd) => {
		if (dd) {
			let $ = cheerio.load(dd);
			let postsCount = JSON.parse($("textarea#preloadedState").text().replace(/"updated":new Date\("/g, `"updated": "`).replace(/\.000Z"\),/g, `.000Z",`)).columns[`${zhihuId}`].postsCount;
			// fs.writeFileSync('./json.json', $("textarea#preloadedState").text().replace(/"updated":new Date\("/g, `"updated": "`).replace(/\.000Z"\),/g, `.000Z",`))
			loopdown(postsCount);
		}
	});

	let loopdown = (postsCount) => {
		let posts = postsCount % 20;
		let writeTimes = 0;
		let times = (postsCount - posts) / 20;

		for (let i = 0; i <= times; i++) {
			let urlp = `https://zhuanlan.zhihu.com/api/columns/${zhihuId}/posts?limit=20&amp;offset=${i*20}`;
			let writeStream = fs.createWriteStream(`${path}/${zhihuId}/${i}.json`, {
				autoClose: true
			});
			request(urlp).pipe(writeStream);

			writeStream.on('finish', function () {
				console.log(`📩  ${zhihuId}/${i}.json`);

				if (writeTimes === times) {
					ep.emit('got_file', times);
				}
				++writeTimes;
			});

		}
	}
	ep.all('got_file', () => {
		md(path, zhihuId, format);
	});
}
/**
 * 
 */