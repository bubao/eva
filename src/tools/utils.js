const { fs, _, URL, URLSearchParams, path, slog, clicolor } = require('./commonModules');

/**
 * mkdir
 * @param {string} name dir名
 * @param {string} localPath dir路径
 */
function mkdir(name, localPath) {
	let filePath = path.resolve(localPath, name);
	fs.exists(filePath, (exists) => {
		if (exists) {
			console.log(`⚓  ${name} 文件夹已经存在`);
		} else {
			fs.mkdir(filePath, (err) => {
				if (err) {
					console.error(err);
				}
				console.log(`🤖 创建 ${name}文件夹成功`);
			});
		}
	});
}

/**
 * 获取url的参数
 * @param {number} offset 
 * @param {number} limit 
 */
let getURLParams = (params) => {
	let { offset, limit, ...other } = params
	limit = limit ? _.clamp(limit, 1, 20) : undefined;
	offset = offset * limit !== NaN ? offset * limit : undefined;
	return {
		limit: limit,
		'amp;offset': offset,
		...other
	}
}

/**
 * 获取真实url
 * @param {string} url url
 * @param {object} params url参数object
 */
let getTrueURL = (url, params) => {
	url = new URL(url);
	url.search = new URLSearchParams(getURLParams(params));
	return url.toString();
}

/**
 * 字节转换
 * @param {number} limit 
 */
function byteSize(limit) {
	let size = "";
	if (limit < 0.1 * 1024) {                            //小于0.1KB，则转化成B
		size = limit.toFixed(2) + "B";
	} else if (limit < 0.1 * 1024 * 1024) {            //小于0.1MB，则转化成KB
		size = (limit / 1024).toFixed(2) + "KB";
	} else if (limit < 0.1 * 1024 * 1024 * 1024) {        //小于0.1GB，则转化成MB
		size = (limit / (1024 * 1024)).toFixed(2) + "MB";
	} else {                                            //其他转化成GB
		size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
	}

	let sizeStr = size + "";                        //转成字符串
	let index = sizeStr.indexOf(".");                    //获取小数点处的索引
	let dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
	if (dou == "00") {                                //判断后两位是否为00，如果是则删除00                
		return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
	}
	return size;
}

/**
 * ProgressBar 命令行进度条
 * @param {string} description 命令行开头的文字信息
 * @param {number} bar_length 进度条的长度(单位：字符)，默认设为 25
 */
/**
 * ProgressBar 命令行进度条
 * @param {string} description 命令行开头的文字信息
 * @param {number} bar_length 进度条的长度(单位：字符)，默认设为 25
 */
function ProgressBar(description, bar_length) {
	// 两个基本参数(属性)
	this.description = description || 'Progress';    // 命令行开头的文字信息
	this.length = bar_length || 25;           // 进度条的长度(单位：字符)，默认设为 25
	this.description = clicolor.blue.bold(this.description);
	// 刷新进度条图案、文字的方法

	function time(d) {
		d = parseInt(d);
		let s, m, h = 0;
		let t = '321';
		if (d < 60) {
			s = d % 60;
			t = s + '秒';
		} else if (d < 60 * 60) {
			s = d % 60;
			m = (d - s) / 60;
			t = _pad(m) + '分' + _pad(s) + '秒';
		} else {
			s = d % 60;
			m = (d - s) / 60;
			m = m >= 60 ? 0 : m;
			h = (d - s - m * 60) / 60 / 60;
			t = _pad(h) + ':' + _pad(m) + ':' + _pad(s);
		}
		return t;
	}

	function _pad(n, c = 2) {
		n = String(n)
		while (n.length < c) {
			n = '0' + n
		}
		return n
	}
	/**
	 * @param {object} opts 
	 * completed 已完成
	 * total 全长
	 */
	this.render = function (opts) {
		let percent = (opts.completed / opts.total).toFixed(4);  // 计算进度(子任务的 完成数 除以 总数)
		let cell_num = Math.floor(percent * this.length);       // 计算需要多少个 █ 符号来拼凑图案

		// 拼接黑色条
		let cell = '';
		for (let i = 0; i < cell_num; i++) {
			cell += '█';
		}

		// 拼接灰色条
		let empty = '';
		for (let i = 0; i < this.length - cell_num; i++) {
			empty += '░';
		}

		cell = clicolor.green.bgBlack.bold(cell);
		opts.completed = clicolor.yellow.bold(byteSize(opts.completed));
		opts.total = clicolor.blue.bold(byteSize(opts.total));
		this.status = (100 * percent).toFixed(2) == 100.00 ? opts.status.end : opts.status.down;
		// 拼接最终文本
		let cmdText = this.description + ': ' + (100 * percent).toFixed(2) + '% ' + cell + empty + ' ' + opts.completed + '/' + opts.total + ' ' + time(new Date().valueOf() / 1000 - parseInt(opts.time.start)) + ' ' + this.status;

		// 在单行输出文本
		// slog(cmdText);
		// 在单行输出文本
		// slog(cmdText);
		if ((100 * percent).toFixed(2) !== '100.00') {
			slog(cmdText);
		} else {
			slog('');
		}
	};
}

module.exports = {
	mkdir,
	getURLParams,
	getTrueURL,
	byteSize,
	ProgressBar
}