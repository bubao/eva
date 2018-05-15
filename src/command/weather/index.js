/**
 * @author bubao 
 * @description 
 * @date: 2018-07-18
 * @Last Modified by: bubao 
 * @Last Modified time: 2018-05-15 19:08:22 
 */
const { request } = require("../../tools/commonModules");
const Table = require('cli-table2');
const findIndex = require('lodash/findIndex');
const citycode = require("./sources/city.json");
const weatherSign = require("./sources/weatherSign");
const { console } = require('../../tools/commonModules');

/**
 * 细节信息table
 * @param {object} future 爬取到的数据
 * @returns {string} 表格
 */
const detailTable = (future) => {
	const table = new Table({
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
	return table.toString();
};

/**
 * townWather
 * @param {string} url weather 的访问网址
 * @param {object} program 是否带属性
 */
const townWather = async (url, program) => {
	const responent = await request({ uri: url });
	if (responent.error) {
		return;
	}
	const data = responent.body;
	const da = JSON.parse(data);
	const { today, now, future } = da.weather[0];
	const lastUpdate = da.weather[0].last_update.toLocaleString().replace(/T/, ' ⏲ ').replace("+08:00", "").replace(/^/, "🔠");

	console.log(`
  📅${future[0].date} ${future[0].day}
  🐚${da.weather[0].city_name}:${weatherSign[da.weather[0].now.text] || "🔆"}
  🌅:${today.sunrise}    🌄:${today.sunset}
  pm2.5:${now.air_quality.city.pm25}
  空气质量:${now.air_quality.city.quality}
  空气质量指数:${now.air_quality.city.aqi}
  🌡:${now.temperature}°C    🍃:${future[0].wind}
${ program.detail && detailTable(future) || ""}
  最近更新时间： ${lastUpdate}`);
};

/**
 * 天气预报
 * @param {*} sName 城市名
 * @param {*} program 是否带属性
 */
const weather = (sName, program) => {
	const index = findIndex(citycode, (o) => {
		return o.townName === sName;
	});
	const url = `http://tj.nineton.cn/Heart/index/all?city=${citycode[index].townID}&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b`;
	townWather(url, program);
};

module.exports = weather;