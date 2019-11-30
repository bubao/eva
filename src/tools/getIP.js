const request = require("./request");
const cheerio = require("cheerio");
const fs = require("fs");
const times = require("lodash/times");
const console = require("console");

const proxys = []; // 保存从网站上获取到的代理
const useful = []; // 保存检查过有效性的代理

/**
 * 把获取到的有用的代理保存成json文件，以便在别处使用
 */
function saveProxys() {
	fs.writeFileSync("proxys.json", JSON.stringify(useful));
	console.log("Save finished!");
}

/**
 * 过滤无效的代理
 */
async function check() {
	const url = "https://www.baidu.com/";
	let flag = proxys.length; // 检查是否所有异步函数都执行完的标志量
	times(proxys.length, async i => {
		const proxy = proxys[i];
		const object = {
			url,
			proxy: `http://${proxy.ip}:${proxy.port}`,
			method: "GET",
			timeout: 5000, // 20s没有返回则视为代理不行
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.861.0 Safari/535.2",
				Connection: "keep-alive",
				Accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
			}
		};
		const { error, response } = await request(object);
		if (!error) {
			if (response.statusCode === 200) {
				// 这里因为nodejs的异步特性，不能push(proxy),那样会存的都是最后一个
				useful.push(response.request.proxy.href);
				console.log(response.request.proxy.href, "useful!");
			} else {
				console.log(response.request.proxy.href, "failed!");
			}
		} else {
			console.log("One proxy failed!");
		}
		flag -= 1;
		if (!flag) {
			saveProxys();
		}
	});
}

/**
 * 获取www.xicidaili.com提供的免费代理
 */
async function getXici() {
	const url = "http://www.xicidaili.com/nn/"; // 国内高匿代理

	const { body } = await request({
		url,
		method: "GET",
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.861.0 Safari/535.2",
			Connection: "keep-alive",
			Accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
			"Accept-Language": "zh - CN, zh;q = 0.8",
			"Cache-Control": "max - age = 0"
		} // 给个浏览器头，不然网站拒绝访问
	});

	const $ = cheerio.load(body);
	const trs = $("#ip_list .odd");
	times(trs.length, i => {
		const proxy = {};
		const tr = trs.eq(i);
		const tds = tr.children("td");
		proxy.ip = tds.eq(1).text();
		proxy.port = tds.eq(2).text();
		let speed = tds
			.eq(7)
			.children("div")
			.attr("title");
		speed = speed.substring(0, speed.length - 1);
		let connectTime = tds.eq(8).text();
		connectTime = parseInt(connectTime, 10);
		if (speed <= 5 && connectTime <= 2) {
			// 用速度和连接时间筛选一轮
			proxys.push(proxy);
		}
	});
	await check();
}

getXici(); // 启动这个爬虫
