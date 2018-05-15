let { exec } = require('child_process');
let fs = require('fs');
let _ = require('lodash');
let localImage = require('./localImage.js')

/**
 * 
 * @param {string} p 下载路径
 * @param {string} name 下载路径的文件夹名
 * @param {object} ebookJson ebookJson数据
 */
let ebook = (p, name, ebookJson) => {
	exec(`cat ${p}/${name}/* >> ${p}/${name}Ebook/${name}.md`, (err) => {
		if (err) {
			throw err;
		}
		localImage(p, name, `${p}/${name}Ebook/${name}.md`, () => {
			let mdfile = fs.readdirSync(`${p}/${name}`);
			_.forEach(fs.readdirSync(`${p}/${name}`), (item, index) => {
				ebookJson.content[index] = {
					title: mdfile[index].replace(/\.md/, '').split(';')[1],
					data: mdfile[index]
				};
			});
		});
	});
}

module.exports = ebook;