#!/usr/bin/env node
/**
 * @Description: node脚本命令行工具
 * @Author: bubao
 * @Date: 2017-7-16 17:28:33
 * @LastEditors: bubao
 * @LastEditTime: 2020-01-16 14:59:34
 */

const fs = require("fs");
const path = require("path");
const program = require("commander");
const xmly = require("./src/command/xmly");
const download = require("./src/command/download");
const zhihu = require("./src/command/zhihuzhuanlan");
const qrcode = require("./src/command/qrcode");
const update = require("./src/command/update");
const { console } = require("./src/tools/commonModules");
let noLog = false;

// 知乎专栏爬虫
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

    $ eva zhuanlan leanreact
    $ eva z leanreact -o ~/
		`);
	});

// 喜马拉雅fm爬虫
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

    $ eva xmly ID
    $ eva x ID -o ~/ID.txt
		`);
	});

// 下载器
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

    $ eva download https://www.baidu.com
    $ eva d https://www.baidu.com -o ~/
		`);
	});

// 二维码
program
	.command("qrcode <str>")
	.alias("q")
	.description("Generate qrcode")
	.action(str => {
		qrcode(str);
	})
	.on("--help", () => {
		console.log(`
  举个例子:

    $ eva qrcode https://www.baidu.com
    $ eva q https://www.baidu.com
		`);
	});

// update
program
	.command("update [path]")
	.alias("u")
	.description("update eva")
	.action(str => {
		update(str);
	})
	.on("--help", () => {
		console.log(`
  举个例子:

    $ eva qrcode https://www.baidu.com
    $ eva q https://www.baidu.com
		`);
	});

function ReadMe() {
	const README = fs.readFileSync(path.join(__dirname, "README.md"));
	return `${README}`;
}

program.parse(process.argv);

if (!program.args.length && !noLog) {
	// program.outputHelp(ReadMe);
	program.outputHelp();
}
