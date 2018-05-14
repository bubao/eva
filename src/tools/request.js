const request = require('request');
const _ = require('lodash');
const fs = require('fs');
/**
 * @description async版 request 模块
 * @author bubao
 * @param {Object} options {pipe,hiden,time,size,readable}
 * @param {Function} callback 进度条返回数据 
 * @returns {
                completed: read,// 已读取
                total, //全部
                hiden, //完成后是否隐藏进度条
                time: { start }, //任务开始时间
                status: {
                    down: '正在下载...', //下载时的文字
                    end: '完成\n' //完成后的信息
                }
			}
  * @date 2018-5-12 20:38:12
 */
async function Get(options, callback) {
	let { pipe, hiden, time, size, readable, ...opts } = options;
	let start = time != undefined ? time.start : new Date().valueOf() / 1000;
	let read = options.read || 0;
	let response = 0;
	let total = 0;
	Get.get = request.get;
	return await new Promise((resolve) => {
		let buffer = Buffer(0);
		let res = request(opts, (error, response, body) => {
			resolve({ error, response, body, read, bufferBody: buffer.toString("utf8") });
		}).on('response', (resp) => {
			if (resp.headers['content-length'] || size) {
				response = parseInt(resp.headers['content-length'] || size || 0);
			}
		}).on('data', (data) => {
			read += data.length;
			if (readable) {
				buffer = Buffer.concat([buffer, data]);
			}
			total = ((size != undefined || response == undefined) && size >= read) ? size : response || read + 1;
			if (_.isFunction(callback)) {
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
			}
		});
		//如果 pipe参数存在，则下载到指定路径
		if (pipe) {
			res.pipe(fs.createWriteStream(pipe.out || './'));
		}
	});
}

module.exports = Get;