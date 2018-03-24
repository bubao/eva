const { fs, _, URL, URLSearchParams, path, slog, clicolor, request, crypto } = require('./commonModules');

/**
 * mkdir
 * @param {string} filePath dir路径
 */
function mkdir(filePath) {
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

let parseURL = (url) => {
	return new URL(url);
}

let MD5 = (str) => {
	return crypto.createHash('md5').update(str, 'utf8').digest("hex");
}

/**
 * 获取真实url
 * @param {string} url url
 * @param {object} params url参数object
 */
let getTrueURL = (url, params) => {
	url = parseURL(url);
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
 * 时间转化
 * @param {number} d date
 */
function time(d) {
	d = parseInt(d);
	let s, m, h = 0;
	let t = '';
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
 * 数字保留c位
 * @param {number} n 数字
 * @param {number} c 保留位,默认为两位
 */
function _pad(n, c = 2) {
	n = String(n)
	while (n.length < c) {
		n = '0' + n;
	}
	return n;
}


/**
 * 修改后缀名
 * @param {string} name 需要修改后缀的文件名
 * @param {string} ext 有后缀名的文件名
 */
function fileName(name, ext) {
	let matches = ext.match(/\.([^.]+)$/);
	if (matches !== null) {
		ext = '.' + matches[matches.length - 1];
	} else {
		ext = '';
	}
	return name.split('.').pop() + ext;
}

function getHTML(url, callback) {
	request(url, (error, response, body) => {
		callback({ error, response, body });
	})
}
module.exports = {
	mkdir,
	getURLParams,
	getTrueURL,
	parseURL,
	byteSize,
	fileName,
	time,
	_pad,
	getHTML,
	MD5,
}