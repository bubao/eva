let fs = require('fs');
let request = require("request");
let _ = require("lodash");
let path = require('path');

let loop = (p, name, arr, cb) => {
	if (arr.length) {
		request(arr[0]).pipe(fs.createWriteStream(`${p}/${name}/imgs/${path.basename(arr[0])}`)).on('close', () => {
			loop(_.slice(arr, 1));
		});
	} else {
		console.log('end');
		if (cb !== undefined) {
			cb();
		}
	}
}

// loop(JSON.parse(fs.readFileSync("./1.json")))
// fs.writeFileSync("./1.json", JSON.stringify(all).replace(/\!\[\]\(/g, "").replace(/\)/g, ""))
module.exports = localImage = (p, name, mdp, cb) => {
	let md = fs.readFileSync(mdp, 'utf8');
	let all = md.match(/\!\[\]\(https.*?\)/g);
	loop(p, name, JSON.parse(JSON.stringify(all).replace(/\!\[\]\(/g, "").replace(/\)/g, "")), cb)
}