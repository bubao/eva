/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-01-15 16:30:08
 * @LastEditors: bubao
 * @LastEditTime: 2020-01-15 18:31:40
 */
const mkdirp = require("mkdirp");
const { path, fs } = require("../../tools/commonModules");

async function update(sourcePath) {
	// TODO 如果这个值存在，就更新配置中的源码路径
	if (sourcePath) {
		const isDirectory = await new Promise(resolve => {
			fs.stat(sourcePath, (err, state) => {
				if (err) {
					return resolve({ error: true });
				}

				resolve({
					error: false,
					isDirectory: state.isDirectory(),
					isFile: state.isFile()
				});
			});
		});
		console.log(isDirectory);
	}
}
update("/home1");
module.exports = update;
