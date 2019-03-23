const fs = require('fs');
const request = require('request');
const path = require('path');

/**
 * 读取本地文件 1.md
 * 下载到imgs文件夹下
 */
const md = fs.readFileSync('./1.md', 'utf8');
const all = md.match(/!\[\]\(https.*?\)/g);

const loop = arr => {
	if (arr.length) {
		const item = arr.splice(0, 1)[0];
		request(item)
			.pipe(fs.createWriteStream(`imgs/${path.basename(item)}`))
			.on('close', () => {
				loop(arr);
			});
	}
};

loop(
	JSON.parse(
		JSON.stringify(all)
			.replace(/!\[\]\(/g, '')
			.replace(/\)/g, ''),
	),
);
