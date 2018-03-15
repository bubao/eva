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
 * 
 * @param {number} d date
 */
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

/**
 * 
 * @param {number} n 
 * @param {number} c 
 */
function _pad(n, c = 2) {
	n = String(n)
	while (n.length < c) {
		n = '0' + n
	}
	return n
}



function fileName(name) {
	let matches = name.match(/\.([^.]+)$/);
	let ext;
	if (matches) {
		ext = matches[1];
	}
	name = name.split('.').pop() + (ext ? ('.' + ext) : '');
	return name
}
module.exports = {
	mkdir,
	getURLParams,
	getTrueURL,
	byteSize,
	fileName,
	time,
	_pad,
}