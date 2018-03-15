#!/usr/bin/env node

let program = require('commander');
// require('shelljs/global');
let zhihu = require("./src/command/zhihu/zhihuzhuanlan.js");
let markdown = require("./src/command/build/markdown.js");
let weather = require("./src/command/weather/weather.js");
let download = require('./src/command/download');

program
	.command('crawler [zhihuId]')
	.alias('cr')
	.description('🔄 知乎专栏爬虫 ⛎')
	.option('-o ,--out <path>', "🔙 输出位置")
	.option('-f ,--format <ebook>', "🔙 输出位置")
	.action((zhihuId, options) => {
		zhihuId = zhihuId || "leanreact";
		let path = options.out || process.cwd(); //当前执行路径
		let format = options.format || 'md';
		console.log('🐛   知乎专栏爬取 %s 到 %s 文件夹', zhihuId, path);
		zhihu(zhihuId, path, format);
	}).on('--help', () => {
		console.log(`
  举个例子:

    $ nodc crawler leanreact
    $ nodc cr leanreact -o ~/
		`);
	});

program
	.command('weather [townName]')
	.alias('wt')
	.description('🔄 天气助手 ⛎')
	.option('-d ,--detail', "🔙 详情")
	.action((townName, program) => {
		townName = townName || "深圳";
		weather(townName, program)
	}).on('--help', () => {
		console.log(`
  举个例子:

    $ nodc wt 广州
    $ nodc weather
		`);
	});

program
	.command('download [url]')
	.alias('d')
	.description('🔄 下载器 ⛎')
	.option('-o ,--out <path>', "🔙 输出位置")
	.option('-d ,--description <description>', "🔙 输出位置")
	.option('-l ,--length <length>', "🔙 进度条长度")
	.option('-n ,--name <name>', "🔙 输出位置")
	.action((url, options) => {
		url = url || "leanreact";
		options.out = options.out || process.cwd(); //当前执行路径
		options.length = parseInt(options.length) || 50;
		if (options.name) {
			console.log('🐛   下载 %s 到 %s ', options.name, path);
		} else {
			console.log('🐛   下载 %s 到 %s ', url, path);
		}
		download(url, options);
	}).on('--help', () => {
		console.log(`
  举个例子:

    $ nodc download https://www.baidu.com
    $ nodc d https://www.baidu.com -o ~/
		`);
	});

program.parse(process.argv);

// program
// 	.option('hexo [name]', '🔙 hexo快速生成模板')
// 	.option('jieba <file>', '⛎ 文件结巴分词统计词频')