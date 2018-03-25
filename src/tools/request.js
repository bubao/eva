let { request, fs } = require('../tools/commonModules');

class reqp {
	/**
	 * 下载器
	 * 
	 * @param {object} options 
	 * @param {function} callback 进度条返回数据 
	 * @returns {
					completed: read,// 已读取
					total, //全部
					hiden, //完成后是否隐藏进度条
					time: { start }, //任务开始时间
					status: {
						down: '正在下载...', //下载时的文字
						end: '完成\n' //完成后的信息
					}
	 */
	async Get(options, callback) {
		let { pipe, hiden, time, size, ...opts } = options;
		let start = time != undefined ? time.start : new Date().valueOf() / 1000;
		let read = options.read || 0;
		let response = 0;
		let total = 0;
		return await new Promise((resolve) => {
			let res = request(opts, (error, response, body) => {
				resolve({ error, response, body, read });
			}).on('response', (resp) => {
				if (resp.headers['content-length'] || size) {
					response = parseInt(resp.headers['content-length'] || size || 0);
				}
			}).on('data', (data) => {
				read += data.length;

				total = ((size != undefined || response == undefined) && size >= read) ? size : response || read + 1;

				callback({
					completed: read,
					total,
					hiden,
					time: { start },
					status: {
						down: '正在下载...',
						end: '完成\n'
					}
				});
			});
			//如果 pipe参数存在，则下载到指定路径
			if (pipe) {
				res.pipe(fs.createWriteStream(pipe.out || './'));
			}
		});
	}
}

module.exports = new reqp;