/**
 * @author bubao
 * @description 电子书生成模块
 * @date: 2018-01-23
 * @Last Modified by: bubao
 * @Last Modified time: 2019-11-30 23:32:19
 */

const { exec } = require("child_process");
const fs = require("fs");
const forEach = require("lodash/forEach");
const localImage = require("./localImage.js");

/**
 *
 * @param {string} p 下载路径
 * @param {string} name 下载路径的文件夹名
 * @param {object} ebookJson ebookJson数据
 */
const ebook = (p, name, ebookJson) => {
	exec(`cat ${p}/${name}/* >> ${p}/${name}Ebook/${name}.md`, err => {
		if (err) throw err;
		localImage(p, name, `${p}/${name}Ebook/${name}.md`, () => {
			const mdfile = fs.readdirSync(`${p}/${name}`);
			forEach(fs.readdirSync(`${p}/${name}`), (item, index) => {
				ebookJson.content[index] = {
					title: mdfile[index].replace(/\.md/, "").split(";")[1],
					data: mdfile[index]
				};
			});
		});
	});
};

module.exports = ebook;
