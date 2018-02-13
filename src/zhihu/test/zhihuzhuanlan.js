let zhihu = require('../index.js');
let fs = require('fs')
zhihu.Post("smzdm").then(res => {
	fs.writeFileSync('./test/a.json', JSON.stringify(res));
})