const fs = require('fs');
let path = require('path');
/**
 * mkdir
 * @param {string} name dir名
 * @param {string} localPath dir路径
 */
function mkdir(name, localPath) {
	let filePath = path.resolve(localPath, name);
	fs.exists(filePath, (exists) => {
		if (exists) {
			console.log(`⚓  ${name} 文件夹已经存在`);
		} else {
			fs.mkdir(filePath, (err) => {
				if (err) {
					console.error(err);
				}
				console.log(`🤖 创建 ${name}文件夹成功`);
			});
		}
	});
}

module.exports = mkdir;