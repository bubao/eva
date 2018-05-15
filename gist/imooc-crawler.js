const url = "https://www.imooc.com/course/programdetail/pid/"
const request = require('request');
const fs = require('fs');

const cr = (i) => {
	request(url + i, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			fs.writeFile(`./c/${i}.html`, JSON.stringify(body), (err, data) => {
				if (!err) {
					console.log(data);
				}
			});
		}
	})
}
for (let i = 0; i < 100; i += 1) {
	cr(i);
}