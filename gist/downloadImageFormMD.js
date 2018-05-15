let fs = require('fs');
let request = require("request");
let _ = require("lodash");
let path = require('path');
/** 
 * 读取本地文件 1.md
 * 下载到imgs文件夹下
*/
let md = fs.readFileSync("./1.md", 'utf8');
let all = md.match(/\!\[\]\(https.*?\)/g);

let loop = (arr) => {
	// if (arr.length) {
	// 	request(arr[0]).pipe(fs.createWriteStream(`imgs/${path.basename(arr[0])}`)).on('close', () => {
	// 		loop(_.slice(arr, 1));
	// 	});
	// } else {
	// 	console.log('end');
	// }
	for (let index = 0; index < arr.length; index++) {
		request(arr[index]).pipe(fs.createWriteStream(`imgs/${path.basename(arr[index])}`));
	}
}
loop(JSON.parse(JSON.stringify(all).replace(/\!\[\]\(/g, "").replace(/\)/g, "")));

