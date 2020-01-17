/**
 * @Description: 喜马拉雅下载器
 * @Author: bubao
 * @Date: 2018-11-11 10:54:30
 * @LastEditors: bubao
 * @LastEditTime: 2020-01-17 12:15:19
 */

const { DownTracks, DownAlbums } = require("xmly");
const promisify = require("util").promisify;
const { console, figlet, path, fs } = require("../../tools/commonModules");
const WriteFile = promisify(fs.writeFile);

async function ximalaya(type, ID, filename) {
	await new Promise(resolve => {
		figlet.text(
			"XMLY",
			{
				font: "Ghost",
				horizontalLayout: "default",
				verticalLayout: "default"
			},
			(err, data) => {
				if (!err) {
					console.log(data);
				}
				resolve();
			}
		);
	});
	filename = path.resolve(filename);
	const Down = type === "albums" ? DownAlbums : DownTracks;
	console.log(`filename:${filename}\nID:${ID}\ntype:${type}`);
	await WriteFile(filename, await Down(ID - 0));
	console.log(`$aria2c -c --input-file=${filename}`);
}

module.exports = ximalaya;
