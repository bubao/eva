#!/usr/bin/env node

let program = require('commander');
// require('shelljs/global');
let zhihu = require("./src/command/zhihu/zhihu.js");
let md = require("./src/command/build/md.js");
let weather = require("./src/command/weather/weather.js")

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

program.parse(process.argv);

// program
// 	.option('hexo [name]', '🔙 hexo快速生成模板')
// 	.option('jieba <file>', '⛎ 文件结巴分词统计词频')