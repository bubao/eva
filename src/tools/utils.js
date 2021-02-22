/**
 * @author bubao
 * @description utils
 * @date: 2018-3-15
 * @Last Modified by: bubao
 * @Last Modified time: 2019-12-01 01:43:38
 */

const clamp = require("lodash/clamp");
const isNaN = require("lodash/isNaN");
const cloneDeep = require("lodash/cloneDeep");
const mkdirp = require("mkdirp");
const { console } = require("./commonModules");
const { fs, URL, URLSearchParams, path, crypto } = require("./commonModules");

/**
 * mkdir
 * @param {string} filePath dir路径
 */
function mkdir(filePath, name) {
	console.log(filePath);
	if (fs.existsSync(`${filePath}`)) {
		console.log(`⚓  ${name} 文件夹已经存在`);
	} else {
		mkdirp(`${filePath}`).then(() => {
			console.log(`🤖 创建 ${name}文件夹成功`);
		}).catch(console.error);
	}
}

/**
 * 获取url的参数
 * @param {number} offset
 * @param {number} limit
 */
const getURLParams = params => {
	let { offset, limit, ...other } = params;
	other = { ...other };
	limit = limit ? clamp(limit, 1, 20) : undefined;
	offset = isNaN(offset * limit) ? offset * limit : undefined;
	return {
		limit,
		"amp;offset": offset,
		...other
	};
};
const parseURL = url => {
	return new URL(url);
};

const defaultName = url => {
	return path.basename(parseURL(url).pathname);
};

const MD5 = str => {
	return crypto.createHash("md5").update(str, "utf8").digest("hex");
};

/**
 * 获取真实url
 * @param {string} url url
 * @param {object} params url参数object
 */
const getTrueURL = (url, params) => {
	url = parseURL(url);
	url.search = new URLSearchParams(getURLParams(params));
	return url.toString();
};

/**
 * 字节转换
 * @param {number} limit
 */
function byteSize(limit) {
	let size = "";
	if (limit === undefined) return "";
	if (limit < 0.1 * 1024) {
		// 小于0.1KB，则转化成B
		size = `${limit.toFixed(2)}B`;
	} else if (limit < 0.1 * 1024 * 1024) {
		// 小于0.1MB，则转化成KB
		size = `${(limit / 1024).toFixed(2)}KB`;
	} else if (limit < 0.1 * 1024 * 1024 * 1024) {
		// 小于0.1GB，则转化成MB
		size = `${(limit / (1024 * 1024)).toFixed(2)}MB`;
	} else {
		// 其他转化成GB
		size = `${(limit / (1024 * 1024 * 1024)).toFixed(2)}GB`;
	}

	const sizeStr = `${size}`; // 转成字符串
	const index = sizeStr.indexOf("."); // 获取小数点处的索引
	const dou = sizeStr.substr(index + 1, 2); // 获取小数点后两位的值
	if (dou === "00") {
		// 判断后两位是否为00，如果是则删除00
		return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
	}
	return size;
}

/**
 * 时间转化
 * @param {number} d date
 */
function time(d) {
	d = parseInt(d, 10);
	let s = 0;
	let m = 0;
	let h = 0;
	let t = "";
	if (d < 60) {
		s = d % 60;
		t = `${s} 秒`;
	} else if (d < 60 * 60) {
		s = d % 60;
		m = (d - s) / 60;
		t = `${pad(m)} 分 ${pad(s)}秒`;
	} else {
		h = parseInt(d / 60 / 60, 10);
		m = parseInt((d - h * 60 * 60) / 60, 10);
		s = d - h * 60 * 60 - m * 60;
		t = `${pad(h)}:${pad(m)}:${pad(s)}`;
	}
	return t;
}

/**
 * 数字保留c位
 * @param {number} n 数字
 * @param {number} c 保留位,默认为两位
 */
function pad(n, c = 2) {
	n = String(n);
	while (n.length < c) {
		n = `0${n}`;
	}
	return n;
}
/**
 * 修改后缀名
 * @param {string} name 需要修改后缀的文件名
 * @param {string} ext 有后缀名的文件名
 */
function fileName(name, ext) {
	name = path.basename(name);
	if (!ext) {
		ext = cloneDeep(name);
	}
	const matches = ext.match(/\.([^.]+)$/);
	if (matches !== null) {
		ext = `.${matches[matches.length - 1]}`;
	} else {
		ext = "";
	}
	return name.split(".").shift() + ext;
}
module.exports = {
	mkdir,
	getURLParams,
	getTrueURL,
	parseURL,
	byteSize,
	fileName,
	time,
	pad,
	defaultName,
	MD5
};
