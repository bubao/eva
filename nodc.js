#!/usr/bin/env node

/**
 * @author bubao
 * @description node脚本命令行工具
 * @date: 2017-7-16
 * @Last Modified by: bubao
 * @Last Modified time: 2018-11-23 02:24:00
 */

const program = require('commander');
const xmly = require("./src/command/xmly");
const download = require('./src/command/download');
const zhihu = require("./src/command/zhihuzhuanlan");
const { console } = require('./src/tools/commonModules');

program
	.command('zhuanlan [zhuanlanId]')
	.alias('z')
	.description('🔄 知乎专栏爬虫 ⛎')
	.option('-o ,--out <path>', "🔙 输出位置")
	.option('-f ,--format <ebook>', "🔙 输出位置")
	.action((zhuanlanId, options) => {
		zhuanlanId = zhuanlanId || "leanreact";
		const path = options.out || process.cwd(); // 当前执行路径
		const format = options.format || 'md';
		console.log('🐛   知乎专栏爬取 %s 到 %s 文件夹', zhuanlanId, path);
		zhihu(zhuanlanId, path, format);
	}).on('--help', () => {
		console.log(`
  举个例子:

    $ nodc zhuanlan leanreact
    $ nodc z leanreact -o ~/
		`);
	});

program
	.command('xmly [ID]')
	.alias('x')
	.description('🔄 喜马拉雅爬虫 ⛎')
	.option('-o ,--out <path>', "🔙 输出位置")
	.option('-t , --type <type>', "🔙 tracks 或者 albums")
	.action((ID, options) => {
		const path = options.out || `${ID}.txt`; // 当前执行路径
		xmly(options.type || "tracks", ID, path);
	}).on('--help', () => {
		console.log(`
  举个例子:

    $ nodc xmly ID
    $ nodc x ID -o ~/ID.txt
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
	.option('-hd ,--hiden <hiden>', "🔙 完成后隐藏进度条信息")
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

function ReadMe(txt) {
	const README = require("fs").readFileSync('./README.md');
	return `${txt}\n${README}`;
}

program.parse(process.argv);

if (!program.args.length) {
	program.outputHelp(ReadMe);
}
