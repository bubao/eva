// https://interface.bilibili.com/playurl?cid=6689771&otype=&player=1&quality=2&ts=1521131667&sign=dde4c12bdb85dfeefbfdb1b215383488

let { getTrueURL, MD5 } = require('../tools/utils');
const { path, _, fs, JSDOM, cheerio } = require('../tools/commonModules');
var gunzip = require('gunzip-file');
let { bilibili } = require('../config/api');
let ProgressBar = require('../modules/ProgressBar');

let { Get } = require('../tools/request');
let options = bilibili;

let config = {
	Playlist: false,
}
function getMultiPageData(html) {

	let multiPageDataString = /window.__INITIAL_STATE__=(.+?);\(function/g.exec(html);
	if (!multiPageDataString) {
		return { data: null, err: 'nothings' };
	}
	return { data: multiPageDataString[0], err: null };
}


async function Bilibili(uri) {
	let { appKey, secKey } = options;
	if (uri.indexOf("bangumi") > -1) {
		options.Bangumi = true;
	}
	let { response, body } = await Get({
		method: 'GET',
		uri,
		gzip: true,
		headers: options.headers,
	}, true);

	if (!config.Playlist) {
		let $ = cheerio.load(body);
		let { data, err } = getMultiPageData(body);
		data = JSON.parse(data.replace('window.__INITIAL_STATE__=', '').replace(';(function', ''));
		if (err == null && !options.Bangumi) {
			let pageString = /\?p=(\d+)/.exec(uri);

			let p = 0;
			if (pageString) {

				p = parseInt(pageString[0]);
			} else {
				p = 1;
			}
			page = data.videoData.pages[p - 1];

			options.cid = data.aid;
			options.cid = page.cid;
			options.subtitle = page.part;
			options.title = _.trim($('#viewbox_report>h1').text()) + options.subtitle;

			fs.writeFileSync('./example.json', data);
		}
		bilibiliDownload(uri, options);
		return
	}

	if (options.Bangumi) {
		let dataString = /window.__INITIAL_STATE__=(.+?);/.exec(body);
		console.log(dataString)
	}
}

let bilibiliDownload = async (uri, options) => {
	let { aid, cid, html } = options;
	let api = await genAPI(aid, cid, options.Bangumi);
	let res = await Get(api, true);
	let apiData = res.body;
	fs.writeFileSync('./edxample.json', JSON.stringify(res.body))
}

async function genAPI(aid, cid, bangumi) {
	let baseAPIURL = "", params = "", utoken = "", api = "";
	let { appKey, secKey } = options;
	if (bilibili.Cookie != undefined) {
		let { body, error, response } = await Get(bilibili.BILIBILI_TOKEN_API + 'aid=' + aid + '&cid=' + cid, true);
		utoken = body;
		console.log(body);
		var t = "", token = "";
		// json.Unmarshal([]byte(utoken), & t)
		// if t.Code != 0 {
		// 	log.Println(bilibili.Cookie)
		// 	log.Fatal("Cookie error: ", t.Message)
		// }
		// utoken = t.Data.Token
	}
	if (bangumi) {
		// The parameters need to be sorted by name
		// qn=0 flag makes the CDN address different every time
		// quality=116(1080P 60) is the highest quality so far
		params = `appkey=${appKey}&cid=${cid}&module=bangumi&otype=json&qn=116&quality=116&season_type=4&type=&utoken=${utoken}`;
		baseAPIURL = bilibili.BILIBILI_BANGUMI_API;
	} else {
		params = `appkey=${appKey}&cid=${cid}&otype=json&qn=116&quality=116&type=`;
		baseAPIURL = bilibili.BILIBILI_API;
	}
	// bangumi utoken also need to put in params to sign, but the ordinary video doesn't need
	api = `${baseAPIURL}${params}&sign=${MD5(params + secKey)}`;
	if (!bangumi && utoken != "") {
		api = `${api}&utoken=${utoken}`;
	}
	return await api;
}

module.exports = Bilibili;