const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const _ = require('lodash');
let https = require("https");
let EventProxy = require('eventproxy');

let md = require('../build/md.js');
let ep = new EventProxy();

/**
 * 知乎专栏抓取器
 * @param {*} zhihuId 知乎专栏的ID
 * @param {*} path 下载路径
 */
let zhihu = (zhihuId, path) => {
	console.log(`-----🐛 ${zhihuId} start -----`);
	fs.exists(`${path}/${zhihuId}`, (exists) => {
		if (exists) {
			console.log(`⚓  ${zhihuId} 文件夹已经存在`);
		} else {
			fs.mkdir(`${path}/${zhihuId}`, (err) => {
				if (err) {
					console.error(err);
				}
				console.log(`🤖 创建 ${zhihuId}文件夹成功`);
			});
		}
	});

	const url = `https://zhuanlan.zhihu.com/${zhihuId}`;

	download(url, (dd) => {
		if (dd) {
			let $ = cheerio.load(dd);
			let postsCount = JSON.parse($("textarea#preloadedState").text().replace(/"updated":new Date\("/g, `"updated": "`).replace(/\.000Z"\),/g, `.000Z",`)).columns[`${zhihuId}`].postsCount;
			// fs.writeFileSync('./json.json', $("textarea#preloadedState").text().replace(/"updated":new Date\("/g, `"updated": "`).replace(/\.000Z"\),/g, `.000Z",`))
			loopdown(postsCount);
		}
	});
	ep.all('got_file', () => md(path, zhihuId));
};
/**
 * 第一层下载器
 * @param {string} url 抓取的网页
 * @param {func} callback callback(data);
 */
let download = (url, callback) => {
	https.get(url, (res) => {
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
};

/**
 * 第二层循环下载器
 * @param {number} postsCount 文章数量
 */
let loopdown = (postsCount) => {
	let posts = postsCount % 20;
	let writeTimes = 0;
	let times = (postsCount - posts) / 20;

	for (let i = 0; i <= times; i++) {
		let urlp = `https://zhuanlan.zhihu.com/api/columns/${zhihuId}/posts?limit=20&amp;offset=${i * 20}`;
		let writeStream = fs.createWriteStream(`${path}/${zhihuId}/${i}.json`, {
			autoClose: true
		});
		request(urlp).pipe(writeStream);
		writeStream.on('finish', () => {
			console.log(`📩  ${zhihuId}/${i}.json`);
			if (writeTimes === times) {
				ep.emit('got_file', times);
			}
			++writeTimes;
		});
	}
};

module.exports = zhihu;