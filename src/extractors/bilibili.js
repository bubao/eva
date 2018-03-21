// https://interface.bilibili.com/playurl?cid=6689771&otype=&player=1&quality=2&ts=1521131667&sign=dde4c12bdb85dfeefbfdb1b215383488

let { getTrueURL } = require('../tools/utils');
const { path, _, request, fs } = require('../tools/commonModules');
let { bilibili } = require('../config/api');
let options = bilibili;
/**
 * 
 * @param {string} url 
 * @param {object} params 
 */
// module.exports = function bilibili(url, params) {
// 	return getTrueURL(url, params);
// }

// let url = bilibili('https://interface.bilibili.com/playurl', {
// 	cid: 6689771,
// 	otype: 'json',
// 	player: 1,
// 	quality: 2,
// 	ts: new Date().valueOf() / 1000,
// 	sign: 'dde4c12bdb85dfeefbfdb1b215383488'
// });
let config = {
	Playlist: false,
}
function getMultiPageData(html) {

	let multiPageDataString = /window.__INITIAL_STATE__=(.+?);\(function/g.exec(html);
	console.log(multiPageDataString)
	if (!multiPageDataString) {
		return { data: '', err: 'nothings' };
	}
	return { data: multiPageDataString[0], err: undefined };
}
function Bilibili(uri) {
	let { appKey, secKey } = options;
	if (uri.indexOf("bangumi") > -1) {
		options.Bangumi = true;
	}
	request(uri, {
		method: 'GET',
		headers: {
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			"Accept-Charset": "UTF-8,*;q=0.5",
			"Accept-Encoding": "gzip,deflate,sdch",
			"Accept-Language": "en-US,en;q=0.8",
			"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36",
		}
	}, (error, response, body) => {
		console.log(error)
		fs.writeFileSync('./tes.json', JSON.stringify(body))
		if (!config.Playlist) {
			options.HTML = body;
			let { data, err } = getMultiPageData(body);
			if (err == undefined && !options.Bangumi) {
				let pageString = `\?p=(\d+)`.exec(url);
				console.log(pageString)
				let p = 0;
				if (pageString) {
					p = 2;
				} else {
					p = 1;
				}

			}
		}
		if (options.Bangumi) {
			let dataString = `window.__INITIAL_STATE__=(.+?);`.exec(body);
		}
	});

}

module.exports = Bilibili;