#!/usr/bin/env node

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio')
var program = require('commander');
const _ = require('lodash');
const h2m =require('h2m')
const imgsrc = '![](https://pic1.zhimg.com/';
var https = require("https");
require('shelljs/global');
var EventProxy = require('eventproxy');

program
	.command('crawler [zhihuId]')
	.alias('cr')
	.description('🔄 知乎专栏爬虫 ⛎')
	.option('-o ,--out <path>',"🔙 输出位置")
	.action(function(zhihuId, options){
		var zhihuId = zhihuId || "leanreact";
		path =  options.out || process.cwd();//当前执行路径
		console.log('🐛   知乎专栏爬取 %s 到 %s 文件夹',zhihuId, path);
		zhihu(zhihuId,path)
	}).on('--help', function() {
    console.log('  举个例子:');
    console.log();
    console.log('    $ nodc crawler leanreact');
    console.log('    $ nodc cr leanreact -o ~/');
    console.log();
  });
program
	.parse(process.argv);


// program
// 	.option('hexo [name]', '🔙 hexo快速生成模板')
// 	.option('jieba <file>', '⛎ 文件结巴分词统计词频')

// console.log('  - %s cheese💘', program.cheese);command.



/**
 * 知乎专栏爬虫
 */
function zhihu(zhihuId,path) {
	 console.log(`-----🐛 ${zhihuId} start -----`);
	fs.exists(`${path}/${zhihuId}`, function(exists) {
		if (exists)
			console.log(`⚓  ${zhihuId} 文件夹已经存在`  );
		else {
			fs.mkdir(`${path}/${zhihuId}`, function(err) {
				if (err)
					console.error(err);
				console.log(`🤖 创建 ${zhihuId}文件夹成功`);
			})
		}
	});

	const url = `https://zhuanlan.zhihu.com/${zhihuId}`;
	function download(url, callback) {
		https.get(url, function(res) {
			var dd = "";
			res.on('data', function(chunk) {
				dd += chunk;
			});
			res.on("end", function() {
				callback(dd);
			});
		}).on("error", function() {
			callback(null);
		});
	}
	var ep = new EventProxy();
	download(url, function(dd) {
		if (dd) {
			var $ = cheerio.load(dd);
			var postsCount = JSON.parse($("textarea#preloadedState").text()).columns[`${zhihuId}`].postsCount
			loopdown(postsCount)
		}
	});

	
	function loopdown(postsCount) {
		// body...
		var posts = postsCount % 20;
		var writeTimes=0;
		var times = (postsCount - posts) / 20;

		for (let i = 0; i <= times; i++) {
			var urlp = `https://zhuanlan.zhihu.com/api/columns/${zhihuId}/posts?limit=20&amp;offset=${i*20}`;
			
			//request.get(urlp, function(err, res, body) {}).pipe(fs.createWriteStream(`${path}/${zhihuId}/${i}.json`))
				
			// console.log(`📩 ${path}/${zhihuId}/${i}.json`)
			var writeStream=fs.createWriteStream(`${path}/${zhihuId}/${i}.json`,{autoClose:true});
			request(urlp).pipe(writeStream);

			writeStream.on('finish',function(){
				console.log(`📩  ${zhihuId}/${i}.json`)
				
				if(writeTimes===times){
					ep.emit('got_file',times)
				}
				++writeTimes;
			});
			
		}
	}
	ep.all('got_file',()=>change());

	function change(){
		for (let j = 0; j < 1000000; j++) {
			if (!fs.existsSync(`${path}/${zhihuId}/${j}.json`)) {
				break;
			}
			fs.readFile(`${path}/${zhihuId}/${j}.json`, (err, res) => {
				if (err) {
					throw err;
				}
				
				let jsonObj = JSON.parse(res);
				_.times(jsonObj.length, (i) => {
					let answer = h2m(jsonObj[i].content);
					const reg = /<noscript>.*?<\/noscript>/g;
					const reg2 = /src="(.*?)"/;
					let src = answer.match(reg);
					let imageList = [];
					src = _.compact(src); // 使用lodash ，即便是src为null也能够转为空的数组
					_.times(src.length, (imageNum) => {
						imageList.push(`![](${src[imageNum].match(reg2)[1]})`);
					});
					_.times(src.length, (imageNum) => {
						answer = answer.replace(src[j], imageList[j]);
					});
					let title = jsonObj[i].title;
					const pattern = new RegExp("[`~!@#$^&'*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
					let rs = '';
					_.times(title.length, (k) => {
						const rs2 = title.substr(k, 1).replace(/\"/, ''); // 使用正则表达式单独去除双引号
						rs += rs2.replace(pattern, '');
					});
					answer = answer.replace(/\!\[\]\(/g, imgsrc);
					title = new Buffer(rs);

					answer = new Buffer(answer);

					let time = `${jsonObj[i].publishedTime}`;
					let T = time.replace("T", " ").replace("+08:00", "");
					let Ti = T.slice(0,9)
					
					const postId = jsonObj[i].url;
					let copyRight = `\n\n知乎原文: [${title}](https://zhuanlan.zhihu.com${postId})`;
					let header = `title: ${title}\n` + `date: ${T} \n` + 'categories: 知乎 \ndescription:  \n \n---\n\n\n ';
					header = new Buffer(header);
					copyRight = new Buffer(copyRight);
					if (!fs.existsSync(`${path}/${zhihuId}md`)) {
						fs.mkdirSync(`${path}/${zhihuId}md`);
					}
					// 如果没有指定目录，创建之
					fs.writeFileSync(`${path}/${zhihuId}md/${Ti};${title}.md`, header, 'utf8', (err) => {
						if (err) throw err;
						console.log(`❌ ${Ti};${title}.md`);
					});
					/**该方法以异步的方式将 data 插入到文件里，如果文件不存在会自动创建。data可以是任意字符串或者缓存。 */
					fs.appendFile(`${path}/${zhihuId}md/${Ti};${title}.md`, answer + copyRight, 'utf8', (err) => {
						if (err) throw err;
						console.log(`🍅  ${Ti};${title}.md`);
					});
				});
			});
		}
	}
}