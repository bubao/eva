const fs = require('fs');
const _ = require('lodash');
const h2m = require('h2m');
let ebook = require('./ebook.js');
const imgsrc = '![](https://pic1.zhimg.com/';

/**
 * markdown(path, zhihuId[, format])
 * @param {string} path 下载地址
 * @param {string} zhihuId 知乎专栏ID
 * @param {string} format 指定为ebook，或者留空
 */
let markdown = (path, zhihuId, res, format) => {
	let jsonObj = res;
	_.times(Object.getOwnPropertyNames(jsonObj).length, (i) => {
		let answer = h2m(jsonObj[i].content);
		const reg = /<noscript>.*?<\/noscript>/g;
		const reg2 = /src="(.*?)"/;
		let src = answer.match(reg);
		let imageList = [];
		src = _.compact(src); // 使用lodash ，即便是src为null也能够转为空的数组
		_.times(src.length, (imageNum) => {
			imageList.push(`![](${src[imageNum].match(reg2)[1]})`);
		});
		_.times(src.length, (imageNum) => {
			answer = answer.replace(src[j], imageList[j]);
		});
		let title = jsonObj[i].title;
		const pattern = new RegExp("[`~!@#$^&'*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
		let rs = '';
		_.times(title.length, (k) => {
			const rs2 = title.substr(k, 1).replace(/\"/, ''); // 使用正则表达式单独去除双引号
			rs += rs2.replace(pattern, '');
		});
		answer = answer.replace(/\!\[\]\(/g, imgsrc);
		title = new Buffer(rs);

		answer = new Buffer(answer);

		let time = `${jsonObj[i].publishedTime}`;
		let T = time.replace("T", ",").replace("+08:00", "");
		let Ti = T.split(',')[0];

		const postId = jsonObj[i].url;
		let copyRight = `\n\n知乎原文: [${title}](https://zhuanlan.zhihu.com${postId})\n\n\n`;
		let header = `# ${title}\n\n` + `date: ${T.replace(",", " ")} \n\n\n`;
		header = new Buffer(header);
		copyRight = new Buffer(copyRight);
		if (!fs.existsSync(`${path}/${zhihuId}`)) {
			fs.mkdirSync(`${path}/${zhihuId}`);
		}
		// 如果没有指定目录，创建之
		fs.writeFileSync(`${path}/${zhihuId}/${Ti};${title}.md`, header, 'utf8', (err) => {
			if (err) throw err;
			console.log(`❌ ${Ti};${title}.md`);
		});

		fs.appendFile(`${path}/${zhihuId}/${Ti};${title}.md`, answer + copyRight, 'utf8', (err) => {
			if (err) throw err;
			console.log(`🍅  ${Ti};${title}.md`);
			if (i === jsonObj.length - 1 && format === "ebook") {
				let ebookObj = (fs.readFileSync(`${path}/${zhihuId}/0.json`))[0];
				ebook(path, zhihuId, {
					title: zhihuId,
					author: ebookObj.author.name,
					content: []
				});
			}
		});
	});
	// 	});
	// }
};

module.exports = markdown;