#!/usr/bin/env node
/**
 * @description: node脚本命令行工具
 * @author: bubao
 * @date: 2017-7-16 17:28:33
 * @last author: bubao
 * @last edit time: 2020-09-17 01:47:21
 */

const program = require("commander");
const xmly = require("./src/command/xmly");
const download = require("./src/command/download");
const zhihu = require("./src/command/zhihuzhuanlan");
const qrcode = require("./src/command/qrcode");
const update = require("./src/command/update");
const wifi = require("./src/command/wifi");
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
			console.log("🐛   知乎专栏爬取 %s 到 %s 文件夹", zhuanlanId, runpath);
			zhihu(zhuanlanId, runpath, format);
		}
	})
	.on("--help", () => {
		console.log(`
  example:

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
  example:

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
				name: typeof program.name === "string" ? program.name : undefined,
				hiden: program.hiden
			};
			download(opts);
		}
	})
	.on("--help", () => {
		console.log(`
  example:

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
  example:

    $ eva qrcode https://www.baidu.com
    $ eva q https://www.baidu.com
		`);
	});

// wifi 二维码
program
	.command("qwifi <ssid>")
	.alias("qw")
	.description("Generate wifi qrcode")
	.option("-p ,--password <password>", "密码")
	.action(ssid => {
		wifi(ssid, program.password);
	})
	.on("--help", () => {
		console.log(`
  example:

    $ eva qwifi ssid -p password
    $ eva qw ssid -p password
		`);
	});

// update
program
	.command("update [path]")
	.alias("u")
	.description("update eva")
	.action(str => {
		noLog = true;
		update(str);
	})
	.on("--help", () => {
		console.log(`
  example:

    $ eva update # 可以接受参数制定eva的所在绝对路径
	  $ eva u
		`);
	});

// function ReadMe() {
// 	const README = fs.readFileSync(path.join(__dirname, "README.md"));
// 	return `${README}`;
// }

program.parse(process.argv);

if (!program.args.length && !noLog) {
	// program.outputHelp(ReadMe);
	program.outputHelp();
}
