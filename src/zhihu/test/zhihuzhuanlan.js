let zhihu = require('../api/zhihuzhuanlan.js');
let fs = require('fs')
zhihu("smzdm").then(res => {
	fs.writeFileSync('./a.json', JSON.stringify(res));
})