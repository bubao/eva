let change = (path, zhihuId) => {
	for (let j = 0; j < 1000000; j++) {
		if (!fs.existsSync(`${path}/${zhihuId}/${j}.json`)) {
			break;
		}
		fs.readFile(`${path}/${zhihuId}/${j}.json`, (err, res) => {
			if (err) {
				throw err;
			}

			let jsonObj = JSON.parse(res);
			_.times(jsonObj.length, (i) => {
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
				let copyRight = `\n\n知乎原文: [${title}](https://zhuanlan.zhihu.com${postId})`;
				let header = `# ${title}\n` + `date: ${T.replace(",", " ")} \n`;
				header = new Buffer(header);
				copyRight = new Buffer(copyRight);
				if (!fs.existsSync(`${path}/${zhihuId}md`)) {
					fs.mkdirSync(`${path}/${zhihuId}md`);
				}
				// 如果没有指定目录，创建之
				fs.writeFileSync(`${path}/${zhihuId}md/${Ti};${title}.md`, header, 'utf8', (err) => {
					if (err) throw err;
					console.log(`❌ ${Ti};${title}.md`);
				});
				/**该方法以异步的方式将 data 插入到文件里，如果文件不存在会自动创建。data可以是任意字符串或者缓存。 */
				fs.appendFile(`${path}/${zhihuId}md/${Ti};${title}.md`, answer + copyRight, 'utf8', (err) => {
					if (err) throw err;
					console.log(`🍅  ${Ti};${title}.md`);
				});
			});
		});
	}
};

module.exports = change;