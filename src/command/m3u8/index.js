const { fileName, defaultName } = require('../../tools/utils');
const { _, fs } = require('../../tools/commonModules');
// let ProgressBar = require('../../modules/ProgressBar');
// const pb = new ProgressBar({ 'description': 'm3u8', bar_length: 50 });
const { Get } = require('../../tools/request');
const m3u8stream = require('m3u8stream');

const match = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/g;


const stream = (url, name) => {
	name = name || fileName(defaultName(url), 'mp4');
	m3u8stream(url)
		.pipe(fs.createWriteStream(name));
}

const Mu3 = (url, name) => {
	const urls = match.exec(url);
	name = name || defaultName(url);
	if (urls.length) {
		_.foreach(urls, (item) => {
			if (item.indexOf('.m3u8') > 0) {
				stream(item, name);
			} else {
				console.log('没有m3u8链接');
			}
		})
	} else {
		console.log('没有链接');
	}

}

module.exports = async (uri, name) => {
	const cons = await Get({ uri });
	Mu3(cons, name);
}