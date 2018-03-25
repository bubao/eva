let api = {
	bilibili: {
		BILIBILI_API: "https://interface.bilibili.com/v2/playurl?",
		BILIBILI_BANGUMI_API: "https://bangumi.bilibili.com/player/web_api/v2/playurl?",
		BILIBILI_TOKEN_API: "https://api.bilibili.com/x/player/playurl/token?",
		appKey: "84956560bc028eb7",
		secKey: "94aba54af9065f71de72f5508f1cd42e",
		// headers: {
		// 	"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
		// 	"Accept-Charset": "UTF-8,*;q=0.5",

		// 	"Accept-Language": "en-US,en;q=0.8",
		// 	"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36",
		// }
		live_api: 'http://live.bilibili.com/api/playurl?otype=json&cid=',
		api_url: 'http://interface.bilibili.com/v2/playurl?',
		bangumi_api_url: 'http://bangumi.bilibili.com/player/web_api/playurl?',
		live_room_init_api_url: 'https://api.live.bilibili.com/room/v1/Room/room_init?id=',
		live_room_info_api_url: 'https://api.live.bilibili.com/room/v1/Room/get_info?room_id=',

		SEC1: '1c15888dc316e05a15fdd0a02ed6584f',
		SEC2: '9b288147e5474dd2aa67085f716c560d',
		stream_types: [
			{ 'id': 'hdflv' },
			{ 'id': 'flv720' },
			{ 'id': 'flv' },
			{ 'id': 'hdmp4' },
			{ 'id': 'mp4' },
			{ 'id': 'live' },
			{ 'id': 'vc' }
		],
		fmt2qlt: {
			hdflv: 4,
			flv: 3,
			hdmp4: 2,
			mp4: 1
		}
	}
}

module.exports = api;