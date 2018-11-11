/**
 * @author bubao
 * @description
 * @date: 2018-03-14
 * @Last Modified by: bubao
 * @Last Modified time: 2018-11-11 12:01:59
 */

const mkdirp = require('mkdirp');
const { console, path, figlet } = require('../../tools/commonModules');
const posts = require('../../modules/zhihu/src/Post');
const markdown = require('../../modules/build/markdown');

/**
 *  知乎专栏抓取器
 * @param {string} postID 知乎专栏的ID
 * @param {string} localPath 下载路径
 * @param {string} format 格式，可省略
 */
async function Post(postID, localPath, format) {
	console.log(`-----🐛 ${postID} start -----`);
	console.log(figlet.textSync(`${postID}`, {
		font: 'Ghost',
		horizontalLayout: 'default',
		verticalLayout: 'default'
	}));
	mkdirp(path.resolve(localPath, postID), postID);
	markdown(localPath, postID, await posts(postID), format);
};

module.exports = Post;
