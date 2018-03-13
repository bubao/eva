let iconv = require('iconv-lite');
let http = require("http");
let Table = require('cli-table2');
let citycode = require("./sources/city.json");
let weatherSign = require("./sources/weatherSign");

/**
 * 天气预报
 * @param {*} sName 城市名
 * @param {*} program 是否带属性
 */
let weather = (sName, program) => {
	for (let i = 0; i < citycode.length; ++i) {
		if (citycode[i].townName === sName) {
			townWather(`http://tj.nineton.cn/Heart/index/all?city=${citycode[i].townID}&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b`, program)
		}
	}
}
/**
 * 
 * @param {*} url weather 的访问网址
 * @param {*} program 
 */
function townWather(url, program) {
	function getdata(url, callback) {
		http.get(url, function (res) {
			let arrBuf = [];
			let bufLength = 0;
			res.on("data", function (chunk) {
				arrBuf.push(chunk);
				bufLength += chunk.length;
			})
				.on("end", function () {
					// arrBuf是个存byte数据块的数组，byte数据块可以转为字符串，数组可不行
					// bufferhelper也就是替你计算了bufLength而已 
					let chunkAll = Buffer.concat(arrBuf, bufLength);
					let strJson = iconv.decode(chunkAll, 'utf8'); // 汉字不乱码
					let str = unescape(strJson.replace(/\\/g, "%").replace(/%\/%/g, "/%"));
					return callback(str)
				});
		});
	}
	getdata(url, function (data) {
		let da = JSON.parse(data)
		let today = da.weather[0].today
		let now = da.weather[0].now
		let future = da.weather[0].future
		let last_update = da.weather[0].last_update.toLocaleString().replace(/T/, ' ⏲ ').replace("+08:00", "").replace(/^/, "🔠");
		let table = new Table({
			chars: {
				'top': '═',
				'top-mid': '╤',
				'top-left': '╔',
				'top-right': '╗',
				'bottom': '═',
				'bottom-mid': '╧',
				'bottom-left': '╚',
				'bottom-right': '╝',
				'left': '║',
				'left-mid': '╟',
				'mid': '─',
				'mid-mid': '┼',
				'right': '║',
				'right-mid': '╢',
				'middle': '│'
			},
		});
		table.push(
			["⛑\n☃",
				`${future[0].date.slice(5)} \n${future[0].day}`,
				`${future[1].date.slice(5)} \n${future[1].day}`,
				`${future[2].date.slice(5)} \n${future[2].day}`,
				`${future[3].date.slice(5)} \n${future[3].day}`,
				`${future[4].date.slice(5)} \n${future[4].day}`,
				`${future[5].date.slice(5)} \n${future[5].day}`,
				`${future[6].date.slice(5)} \n${future[6].day}`
			], ["🌡",
				`${future[0].low}/${future[0].high}°C`,
				`${future[1].low}/${future[1].high}°C`,
				`${future[2].low}/${future[2].high}°C`,
				`${future[3].low}/${future[3].high}°C`,
				`${future[4].low}/${future[4].high}°C`,
				`${future[5].low}/${future[5].high}°C`,
				`${future[6].low}/${future[6].high}°C`
			], ["☘", `${future[0].wind.slice(2)}`,
				`${future[1].wind.slice(2)}`,
				`${future[2].wind.slice(2)}`,
				`${future[3].wind.slice(2)}`,
				`${future[4].wind.slice(2)}`,
				`${future[5].wind.slice(2)}`,
				`${future[6].wind.slice(2)}`
			], ["☂", `${future[0].text}`,
				`${future[1].text}`,
				`${future[2].text}`,
				`${future[3].text}`,
				`${future[4].text}`,
				`${future[5].text}`,
				`${future[6].text}`
			]
		);

		/**
		 * 气象标志，因为Linux上的Emoji是我自己安装的，自宽有点问题
		 * table.push(
		 * 	["☁", "🔰", "⛑", "🐚", "📅", "📆", "🌠", "🌁", "🌁"]
		 * )
		 */

		console.log(`
  📅${future[0].date} ${future[0].day}
  🐚${da.weather[0].city_name}:${weatherSign[da.weather[0].now.text] || "🔆"}
  🌅:${today.sunrise}    🌄:${today.sunset}
  pm2.5:${now.air_quality.city.pm25}
  空气质量:${now.air_quality.city.quality}
  空气质量指数:${now.air_quality.city.aqi}
  🌡:${now.temperature}°C    🍃:${future[0].wind}
${ program.detail && table.toString() || ""}
  最近更新时间： ${last_update}`);
	})
}

module.exports = weather;