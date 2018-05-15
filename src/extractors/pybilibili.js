/**
 * @author bubao 
 * @description 
 * @date: 2018-03-25
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-15 19:02:07
 */

function bilibili_stream_type(urls) {
	let url = urls[0];
	console.log(url)
	if (url.indexOf('hd.flv') > -1 || url.indexOf('-112.flv') > -1) {
		return ['hdflv', 'flv']
	} else if (url.indexOf('-64.flv') > -1) {
		return ['flv720', 'flv']
	} else if (url.indexOf('.flv') > -1) {
		return ['flv', 'flv']
	} else if (url.indexOf('hd.mp4') > -1 || url.indexOf('-48.mp4') > -1) {
		return ['hdmp4', 'mp4']
	} if (url.indexOf('.mp4') > -1) {
		return ['mp4', 'mp4']
	}
	throw new Error('Unknown stream type');
}

function api_req(self, cid, quality, bangumi, bangumi_movie = false, ...kwargs) {
	ts = str(int(time.time()))
	if (!bangumi) {
		params_str = `cid=${cid}&player=1&quality=${quality}&ts=${ts}`;
		chksum = MD5(params_str + self.SEC1);
		api_url = self.api_url + params_str + '&sign=' + chksum
	}
	else {
		let mod = bangumi_movie ? 'movie' : 'bangumi';
		params_str = `cid=${cid}&module=${mod}&player=1&quality={quality}&ts=${ts}`
		chksum = MD5(params_str + self.SEC2)
		api_url = self.bangumi_api_url + params_str + '&sign=' + chksum
	}

	xml_str = get_content(api_url, headers = { 'referer': self.url, 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36' });
	return xml_str;
}

module.exports = {
	bilibili_stream_type
}