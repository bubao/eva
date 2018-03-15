let url = "https://www.imooc.com/course/programdetail/pid/"
let request = require('request');
let fs = require('fs');

let cr = (i) => {
	request(url + i, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			fs.writeFile(`./c/${i}.html`, JSON.stringify(body), (error, data) => {
				console.log(data);
			});
		}
	})
}
for (let i = 0; i < 100; i++) {
	cr(i);
}