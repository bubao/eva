const ND = require("../src/modules/NodeDown");

ND.init({
	bar_length: 50,
	description: "下载进度"
}).download({
	url: "https://qd.myapp.com/myapp/qqteam/pcqq/PCQQ2019.exe",
	name: "Sublime Text 3.exe",
	out: "./test",
	hiden: true
});
