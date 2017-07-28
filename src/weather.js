var citycode = require("./city.json")
var iconv = require('iconv-lite');
var http = require("http")
var Table = require('cli-table2');

module.exports = function weather(sName, program) {
    var length = citycode.length
    for (let i = 0; i < length; ++i) {
        (citycode[i].townName === sName) && townWather(`http://tj.nineton.cn/Heart/index/all?city=${citycode[i].townID}&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b`, program)
    }
}

function townWather(url, program) {
    function getdata(url, callback) {
        http.get(url, function(res) {
            var arrBuf = [];
            var bufLength = 0;
            res.on("data", function(chunk) {
                    arrBuf.push(chunk);
                    bufLength += chunk.length;
                })
                .on("end", function() {
                    // arrBuf是个存byte数据块的数组，byte数据块可以转为字符串，数组可不行
                    // bufferhelper也就是替你计算了bufLength而已 
                    var chunkAll = Buffer.concat(arrBuf, bufLength);
                    var strJson = iconv.decode(chunkAll, 'utf8'); // 汉字不乱码
                    var str = unescape(strJson.replace(/\\/g, "%").replace(/%\/%/g, "/%"));
                    return callback(str)
                });
        });
    }
    getdata(url, function(data) {
        let da = JSON.parse(data)
        let today = da.weather[0].today
        let now = da.weather[0].now
        let future = da.weather[0].future
        let last_update = da.weather[0].last_update.toLocaleString().replace(/T/, ' ⏲ ').replace("+08:00", "").replace(/^/, "🔠");
        var table = new Table({
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
            ["⛑\n☃", `${future[0].date.slice(5)} \n${future[0].day}`, `${future[1].date.slice(5)} \n${future[1].day}`, `${future[2].date.slice(5)} \n${future[2].day}`, `${future[3].date.slice(5)} \n${future[3].day}`, `${future[4].date.slice(5)} \n${future[4].day}`, `${future[5].date.slice(5)} \n${future[5].day}`, `${future[6].date.slice(5)} \n${future[6].day}`], ["🌡", `${future[0].low}/${future[0].high}°C`, `${future[1].low}/${future[1].high}°C`, `${future[2].low}/${future[2].high}°C`, `${future[3].low}/${future[3].high}°C`, `${future[4].low}/${future[4].high}°C`, `${future[5].low}/${future[5].high}°C`, `${future[6].low}/${future[6].high}°C`], ["☘", `${future[0].wind.slice(2)}`, `${future[1].wind.slice(2)}`, `${future[2].wind.slice(2)}`, `${future[3].wind.slice(2)}`, `${future[4].wind.slice(2)}`, `${future[5].wind.slice(2)}`, `${future[6].wind.slice(2)}`], ["☂", `${future[0].text}`, `${future[1].text}`, `${future[2].text}`, `${future[3].text}`, `${future[4].text}`, `${future[5].text}`, `${future[6].text}`]
        );
        // table.push(
        //     ["☁","🔰","⛑","🐚","📅","📆","🌠","🌁","🌁"]
        // )
        /**
         * 气象标志
         */
        var text;
        switch (1 < 2) {
            case da.weather[0].now.text === "晴":
                text = "☀"
                break;
            case da.weather[0].now.text === "多云":
                text = "⛅"
                break;
            case da.weather[0].now.text === "阴天":
                text = "☁"
                break;
            case da.weather[0].now.text === "阵雨":
                text = "🌦️"
                break;
            case da.weather[0].now.text === "雷阵雨":
                text = "⛈️"
                break;
            case da.weather[0].now.text === "小雨":
                text = "☁"
                break;
            case da.weather[0].now.text === "中雨":
                text = "☁"
                break;
            case da.weather[0].now.text === "大雨":
                text = "🌧"
                break;
            case da.weather[0].now.text === "暴雨":
                text = "🌧"
                break;
            case da.weather[0].now.text === "大暴雨":
                text = "🌧"
                break;
            case da.weather[0].now.text === "特大暴雨":
                text = "🌧"
                break;
            case da.weather[0].now.text === "小到中雨":
                text = "🌥"
                break;
            case da.weather[0].now.text === "雷电":
                text = "🌩"
                break;
            case da.weather[0].now.text === "多云":
                text = "⚡"
                break;
            case da.weather[0].now.text === "冰雹":
                text = "☄️"
                break;
            case da.weather[0].now.text === "霾":
                text = "😷"
                break;
            case da.weather[0].now.text === "雾":
                text = "🌫️🌫️"
                break;
            case da.weather[0].now.text === "轻雾":
                text = "🌫"
                break;
            case da.weather[0].now.text === "浓雾":
                text = "🌫️🌫️🌫️"
                break;
            case da.weather[0].now.text === "雨夹雪":
                text = "🌨"
                break;
            case da.weather[0].now.text === "小雪":
                text = "❄️"
                break;
            case da.weather[0].now.text === "中雪":
                text = "❄️❄️"
                break;
            case da.weather[0].now.text === "大雪":
                text = "❄️❄️❄️"
                break;
            case da.weather[0].now.text === "暴雪":
                text = "❄️❄️❄️❄️"
                break;
            case da.weather[0].now.text === "冻雨":
                text = "🌨"
                break;
            case da.weather[0].now.text === "霜冻":
                text = "📦"
                break;
            case da.weather[0].now.text === "4级风":
                text = "4🇫"
                break;
            case da.weather[0].now.text === "5级风":
                text = "5🇫"
                break;
            case da.weather[0].now.text === "6级风":
                text = "6🇫"
                break;
            case da.weather[0].now.text === "7级风":
                text = "7🇫"
                break;
            case da.weather[0].now.text === "8级风":
                text = "8🇫"
                break;
            case da.weather[0].now.text === "9级风":
                text = "9🇫"
                break;
            case da.weather[0].now.text === "10级风":
                text = "10🇫"
                break;
            case da.weather[0].now.text === "11级风":
                text = "11🇫"
                break;
            case da.weather[0].now.text === "12级及以上风":
                text = "12🇫"
                break;
            case da.weather[0].now.text === "台风":
                text = "🌀"
                break;
            case da.weather[0].now.text === "浮尘":
                text = "🇸"
                break;
            case da.weather[0].now.text === "扬沙":
                text = "🇸⬆"
                break;
            case da.weather[0].now.text === "沙尘暴":
                text = "🇸➡"
                break;
            default:
                text = "🔆"
                break;
        }

        console.log(`   📅${future[0].date} ${future[0].day} ⏲ ${new Date().toLocaleTimeString()}`)
        console.log()
        console.log(`   🐚${da.weather[0].city_name}:${text}`)
        console.log()
        console.log(`   🌅:${today.sunrise}    🌄:${today.sunset}`)
        console.log()
        console.log(`   pm2.5:${now.air_quality.city.pm25}`)
        console.log(`   空气质量:${now.air_quality.city.quality}`)
        console.log(`   空气质量指数:${now.air_quality.city.aqi}`)
        console.log()
        console.log(`   🌡:${now.temperature}°C    🍃:${future[0].wind}`)
        console.log()
            // console.log(`   ${today.suggestion}`,today.suggestion)//建议
            // console.log(future)
        if (program.detail) {
            console.log(table.toString());
        }

        console.log(`   最近更新时间： ${last_update}`)
    })
}