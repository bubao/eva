/**
 * @author bubao
 * @description 喜马拉雅下载器
 * @date: 2018-11-11 10:54:30
 * @Last Modified by: bubao
 * @Last Modified time: 2019-02-09 20:53:46
 */

const { DownTracks, DownAlbums } = require('xmly');
const { console, figlet, path, fs } = require('../../tools/commonModules');

async function ximalaya(type, ID, filename) {
	console.log(figlet.textSync(`XMLY`, {
		font: 'Ghost',
		horizontalLayout: 'default',
		verticalLayout: 'default'
	}));
	console.log(`-----🐛 ${ID} start -----`);
	filename = path.resolve(filename);
	const func = type === "albums" ? DownAlbums : DownTracks;
	console.log(`filename:${filename}\nID:${ID}\ntype:${type}`)
	fs.writeFileSync(filename, await func(ID - 0));
	console.log(`$aria2c -c --input-file=${filename}`);
}

module.exports = ximalaya;
