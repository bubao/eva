let crawl = require('./crawl.js');
let localImage = require('./localImage.js');

module.exports = {
	crawl: crawl(),
	localImage: localImage(),
	qiniuImage: qiniuImage(),
	ebook: ebook(),
}