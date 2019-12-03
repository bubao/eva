#!/usr/bin/env node
/**
 * @Description: node脚本命令行工具
 * @Author: bubao
 * @Date: 2017-7-16 17:28:33
 * @LastEditors: bubao
 * @LastEditTime: 2019-12-03 17:25:10
 */

/**
 * @author bubao
 * @description node脚本命令行工具
 * @date: 2017-7-16
 * @Last Modified by: bubao
 * @Last Modified time: 2019-12-01 00:52:29
 */

const fs = require("fs");
const path = require("path");
const program = require("commander");
const xmly = require("./src/command/xmly");
const download = require("./src/command/download");
const zhihu = require("./src/command/zhihuzhuanlan");
const { console } = require("./src/tools/commonModules");
let noLog = false;

program
	.command("zhuanlan [zhuanlanId]")
	.alias("z")
	.description("🔄 知乎专栏爬虫 ⛎")
	.option("-o ,--out <path>", "🔙 输出位置")
	.option("-f ,--format <ebook>", "🔙 输出位置")
	.action((zhuanlanId, options) => {
		// zhuanlanId = zhuanlanId || "leanreact";
		noLog = true;
		if (zhuanlanId) {
			const runpath = options.out || process.cwd(); // 当前执行路径
			const format = options.format || "md";
			console.log(
				"🐛   知乎专栏爬取 %s 到 %s 文件夹",
				zhuanlanId,
				runpath
			);
			zhihu(zhuanlanId, runpath, format);
		}
	})
	.on("--help", () => {
		console.log(`
  举个例子:

    $ nodc zhuanlan leanreact
    $ nodc z leanreact -o ~/
		`);
	});

program
	.command("xmly [ID]")
	.alias("x")
	.description("🔄 喜马拉雅爬虫 ⛎")
	.option("-o ,--out <path>", "🔙 输出位置")
	.option("-t , --type <type>", "🔙 tracks 或者 albums")
	.action((ID, options) => {
		noLog = true;
		if (ID) {
			const runpath = options.out || `${ID}.txt`; // 当前执行路径
			xmly(options.type || "tracks", ID, runpath);
		}
	})
	.on("--help", () => {
		console.log(`
  举个例子:

    $ nodc xmly ID
    $ nodc x ID -o ~/ID.txt
		`);
	});

program
	.command("download [url]")
	.alias("d")
	.description("🔄 下载器 ⛎")
	.option("-o ,--out <path>", "🔙 输出位置")
	.option("-d ,--description <description>", "🔙 头部信息")
	.option("-l ,--length <length>", "🔙 进度条长度")
	.option("-n ,--name <name>", "🔙 文件名")
	.option("-hd ,--hiden <hiden>", "🔙 完成后隐藏进度条信息")
	.action(url => {
		noLog = true;
		if (url) {
			const opts = {
				url: url || "leanreact",
				out: program.out || process.cwd(),
				length: parseInt(program.length, 10) || 50,
				name:
					typeof program.name === "string" ? program.name : undefined,
				hiden: program.hiden
			};
			download(opts);
		}
	})
	.on("--help", () => {
		console.log(`
  举个例子:

    $ nodc download https://www.baidu.com
    $ nodc d https://www.baidu.com -o ~/
		`);
	});

function ReadMe() {
	const README = fs.readFileSync(path.join(__dirname, "README.md"));
	return `${README}`;
}

program.parse(process.argv);

if (!program.args.length && !noLog) {
	program.outputHelp(ReadMe);
} else {
	program.outputHelp();
}
