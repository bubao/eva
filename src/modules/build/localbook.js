const fs = require('fs');
// const slice = require("lodash/slice");
const path = require('path');
const mkdirp = require('mkdirp');
const { console } = require('../../tools/commonModules');

const localbook = (mdDir) => {
	const fileArray = fs.readdirSync(mdDir);
	const dir = path.resolve(mdDir, '..')
	const newPath = path.join(dir, path.basename(`${mdDir}ebook`), 'imgs');

	mkdirp(newPath);

	fileArray.forEach((filename) => {
		const filedir = path.join(mdDir, filename);
		fs.stat(filedir, (err, stats) => {
			if (err) throw err;
			if (stats.isFile()) {
				// if (/emoji/.test(filename)) {
				console.log(filename)
				const content = fs.readFileSync(path.join(mdDir, filename), 'utf-8');
				fs.appendFileSync(path.join(dir, `${path.dirname(newPath)}.md`), content);
				// }
			} else if (stats.isDirectory()) {
				return false
			}
			return undefined;
		});
	});

}

// module.exports = localbook;

localbook('./test')
