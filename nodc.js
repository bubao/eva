#!/usr/bin/env node

/**
 * @author bubao 
 * @description node脚本命令行工具
 * @date: 2018-05-15 18:37:01 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-15 18:37:48
 */


const program = require('commander');
// require('shelljs/global');
const zhihu = require("./src/command/zhihuzhuanlan");
const weather = require("./src/command/weather");
const download = require('./src/command/download');
const youGet = require('./src/command/youGet');
const { console } = require('./src/tools/commonModules')

program
	.command('crawler [zhihuId]')
	.alias('cr')
	.description('🔄 知乎专栏爬虫 ⛎')
	.option('-o ,--out <path>', "🔙 输出位置")
	.option('-f ,--format <ebook>', "🔙 输出位置")
	.action((zhihuId, options) => {
		zhihuId = zhihuId || "leanreact";
		const path = options.out || process.cwd(); // 当前执行路径
		const format = options.format || 'md';
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
	.action((townName, options) => {
		townName = townName || "深圳";
		weather(townName, options);
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
	.option('-d ,--description <description>', "🔙 头部信息")
	.option('-l ,--length <length>', "🔙 进度条长度")
	.option('-n ,--name <name>', "🔙 文件名")
	.option('-h ,--hiden <hiden>', "🔙 完成后隐藏进度条信息")
	.action((url) => {
		const opts = {
			url: url || "leanreact",
			out: program.out || process.cwd(),
			length: parseInt(program.length, 10) || 50,
			name: typeof program.name === 'string' ? program.name : undefined,
			hiden: program.hiden
		}
		download(opts);
	}).on('--help', () => {
		console.log(`
  举个例子:

    $ nodc download https://www.baidu.com
    $ nodc d https://www.baidu.com -o ~/
		`);
	});

program
	.command('you [url]')
	.alias('y')
	.description('🔄 you-get ⛎')
	.option('-o ,--out <path>', "🔙 输出位置")
	// .option('-d ,--description <description>', "🔙 输出位置")
	// .option('-l ,--length <length>', "🔙 进度条长度")
	// .option('-n ,--name <name>', "🔙 文件名")
	.action((url, options) => {
		const opts = {
			url: url || "leanreact",
			out: options.out || process.cwd(),
			length: parseInt(options.length, 10) || 50,
			name: typeof options.name === 'string' ? options.name : undefined,
		}
		// download(options);
		youGet(opts);
	}).on('--help', () => {
		console.log(`
  举个例子:

    $ nodc you https://www.baidu.com
    $ nodc y https://www.baidu.com -o ~/
		`);
	});

program.parse(process.argv);

// program
// 	.option('hexo [name]', '🔙 hexo快速生成模板')
// 	.option('jieba <file>', '⛎ 文件结巴分词统计词频')