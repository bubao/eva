let { request, fs } = require('../tools/commonModules');

class reqp {
	constructor() {

		this.response = 0;
	}

	async Get(options, callback) {
		let { pipe, size, ...opts } = options;
		let start = new Date().valueOf() / 1000;
		options.read = options.read || 0;
		let response = 0;
		return await new Promise(async (resolve) => {
			let res = request(opts, (error, response, body) => {
				resolve({ error, response, body, read: options.read })
			}).on('response', (resp) => {
				if (resp.headers['content-length'] || size) {
					response = parseInt(resp.headers['content-length'] || size);
				}

			}).on('data', (data) => {
				options.read += data.length;
				callback({
					completed: options.read,
					total: options.read != undefined && options.size != undefined || response == undefined ? options.size : response,
					time: { start },
					status: {
						down: '正在下载...',
						end: '完成\n'
					}
				});
			});

			if (pipe) {
				res.pipe(fs.createWriteStream(pipe.out))
				// .on('close', () => {
				// let end = new Date().valueOf() / 1000;
				// callback = callback || Function();
				// let back = { start: start, end: end, elapsed: time(end - start) }
				// if (end !== undefined) {
				// 	console.log('\n', time(end - start));
				// }
				// callback(back);
				// });
			}
		});
	}

}

let reqcb = async (options, cb) => {
	this.response = 0;
	return
}
// async function req(options) {
// 	return await new Promise(async resolve => {
// 		resolve(request(options));
// 	});
// }


module.exports = new reqp;


// let ProgressBar = require('../ProgressBar');
// const { path, _, request, fs } = require('../../tools/commonModules');
// const { time } = require('../../tools/utils');

// class NodeDown {
// 	constructor(props) {
// 		this.description = props.description;
// 		this.bar_length = props.bar_length;
// 		this.pb = new ProgressBar(this.description, this.bar_length);
// 		this.description = this.pb.description;
// 	}

// 	/**
// 	 * 
// 	 * @param {object} opts 配置
// 	 * {url, localPath, name}
// 	 * @param {function} callback 
// 	 */
// 	async download(opts, callback) {
// 		let { name, url, out, hiden } = opts;
// 		this.pb.description = `${name}\n${this.description}`;
// 		return await new Promise(resolve => {
// 			request.get(url).on('response', (response) => {
// 				if (response.headers['content-length']) {
// 					this.response = parseInt(response.headers['content-length']);
// 				} else {
// 					throw new Error('It is nothing to download!!!')
// 				}
// 			}).on('data', (data) => {
// 				read += data.length;
// 				this.pb.render({
// 					completed: read,
// 					hiden,
// 					total: this.response,
// 					time: { start },
// 					status: {
// 						down: '正在下载...',
// 						end: '完成\n'
// 					}
// 				});
// 			}).on('error', (error) => {
// 				callback(error);
// 				throw error;
// 			})
// 			// }).pipe(fs.createWriteStream(path.join(out, name))).on('close', () => {
// 			// 	end = new Date().valueOf() / 1000;
// 			// 	callback = callback || Function();
// 			// 	let back = { start: start, end: end, elapsed: time(end - start) }
// 			// 	// if (end !== undefined) {
// 			// 	// 	console.log('\n', time(end - start));
// 			// 	// }
// 			// 	callback(back);
// 			// });
// 		})
// 	}
// }

// module.exports = NodeDown;