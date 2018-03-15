let markdown = require('../build/markdown');
const { path, _, request, fs, JSDOM } = require('../../tools/commonModules');
const { mkdir, getTrueURL } = require('../../tools/utils');

/**
 *  知乎专栏抓取器
 * @param {string} zhihuzhuanlanId 知乎专栏的ID
 * @param {string} localPath 下载路径
 * @param {string} format 格式，可省略
 */
function zhihuzhuanlan(zhihuzhuanlanId, localPath, format) {
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
 * 第二层循环下载器
 * @param {number} postsCount 文章数量
 * @param {string} zhihuzhuanlanId 知乎专栏的ID
 * @param {string} localPath 下载路径
 */
function loopdown(postsCount, zhihuzhuanlanId, localPath) {
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

module.exports = zhihuzhuanlan;