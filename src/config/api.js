let api = {
	bilibili: {
		BILIBILI_API: "https://interface.bilibili.com/v2/playurl?",
		BILIBILI_BANGUMI_API: "https://bangumi.bilibili.com/player/web_api/v2/playurl?",
		BILIBILI_TOKEN_API: "https://api.bilibili.com/x/player/playurl/token?",
		appKey: "84956560bc028eb7",
		secKey: "94aba54af9065f71de72f5508f1cd42e",
		headers: {
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			"Accept-Charset": "UTF-8,*;q=0.5",

			"Accept-Language": "en-US,en;q=0.8",
			"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36",
		}
	}
}

module.exports = api;