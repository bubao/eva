const { request, cheerio, fs } = require('../../tools/commonModules');
const markdown = require('../build/markdown');

/**
 * @description 知乎专栏
 * @author bubao
 * @param {string} postID 知乎专栏ID
 * @param {string} path 下载地址
 * @returns 
 */
async function Post(postID, path) {
	console.log(`-----🐛 ${postID} start -----`);

	if (fs.existsSync(`${path}/${postID}`)) {
		console.log(`⚓  ${postID} 文件夹已经存在`);
	} else {
		fs.mkdir(`${path}/${postID}`, function (err) {
			if (err)
				console.error(err);
			console.log(`🤖 创建 ${postID}文件夹成功`);
		});
	}

	const url = `https://zhuanlan.zhihu.com/${postID}`;

	let responent = await request({ uri: url });
	if (responent.error) {
		return;
	}
	let data = responent.body;
	let $ = cheerio.load(data);
	let postsCount = JSON.parse($("textarea#preloadedState").text().replace(/"updated":new Date\("/g, `"updated": "`).replace(/\.000Z"\),/g, `.000Z",`)).columns[`${postID}`].postsCount
	// fs.writeFileSync('./json.json', $("textarea#preloadedState").text().replace(/"updated":new Date\("/g, `"updated": "`).replace(/\.000Z"\),/g, `.000Z",`))

	loopdown(postsCount, postID, path);
}

function loopdown(postsCount, postID, path) {
	// body...
	let posts = postsCount % 20;
	let writeTimes = 0;
	let times = (postsCount - posts) / 20;

	for (let i = 0; i <= times; i++) {
		let urlp = `https://zhuanlan.zhihu.com/api/columns/${postID}/posts?limit=20&amp;offset=${i * 20}`;
		let writeStream = fs.createWriteStream(`${path}/${postID}/${i}.json`, {
			autoClose: true
		});
		request(urlp).pipe(writeStream);

		writeStream.on('finish', function () {
			console.log(`📩  ${postID}/${i}.json`)

			if (writeTimes === times) {
				markdown(path, postID);
			}
			++writeTimes;
		});

	}
}

module.exports = Post;