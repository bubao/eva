let {
	exec
} = require('child_process');
let fs = require('fs');
let _ = require('lodash');
let localImage = require('./localImage.js')

module.exports = ebook = (p, name, ebookJson) => {

	exec(`cat ${p}/${name}md/* >> ${p}/${name}Ebook/${name}.md`, (err) => {
		if (err) {
			throw err;
		}
		localImage(p, name, `${p}/${name}Ebook/${name}.md`, () => {
			let mdfile = fs.readdirSync(`${p}/${name}md`);
			_.forEach(fs.readdirSync(`${p}/${name}md`), (item, index) => {
				ebookJson.content[index] = {
					title: mdfile[index].replace(/\.md/, '').split(';')[1],
					data: mdfile[index]
				};
			});
		});
	});
}