#!/usr/bin/env node

var program = require('commander');
require('shelljs/global');
var zhihu = require("./src/zhihu.js")
var weather = require("./src/weather.js")

program
	.command('crawler [zhihuId]')
	.alias('cr')
	.description('🔄 知乎专栏爬虫 ⛎')
	.option('-o ,--out <path>',"🔙 输出位置")
	.action(function(zhihuId, options){
		var zhihuId = zhihuId || "leanreact";
		var path =  options.out || process.cwd();//当前执行路径
		zhihu(zhihuId,path)
	}).on('--help', function() {
    console.log(`  举个例子:
    $ nodc crawler leanreact
	$ nodc cr leanreact -o ~/
	`);
  });

program
	.command('weather [townName]')
	.alias('wt')
	.description('🔄 天气助手 ⛎')
	.option('-d ,--detail',"🔙 输出位置")
	.action(function(townName, program){
		var townName = townName || "深圳";
		weather(townName,program)
	}).on('--help', function() {
    console.log(`  举个例子:
   
    	$ nodc crawler leanreact');
    	$ nodc cr leanreact -o ~/');
    `);
  });

program
	.parse(process.argv);


// program
// 	.option('hexo [name]', '🔙 hexo快速生成模板')
// 	.option('jieba <file>', '⛎ 文件结巴分词统计词频')

// console.log('  - %s cheese💘', program.cheese);command.



