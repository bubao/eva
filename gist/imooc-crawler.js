const url = 'https://www.imooc.com/course/programdetail/pid/';
const request = require('request');
const fs = require('fs');

const cr = i => {
	request(url + i, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			cr(i + 1);
			fs.writeFile(`./c/${i}.html`, JSON.stringify(body), () => {});
		}
	});
};

cr(0);
