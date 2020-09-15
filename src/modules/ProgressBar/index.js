/**
 * @description: ProgressBar 命令行进度条
 * @author: bubao
 * @Date: 2018-03-15 14:06:45
 * @LastEditors: bubao
 * @LastEditTime: 2020-09-15 20:18:21
 */
const { slog, clicolor } = require("../../tools/commonModules");
const { time, byteSize } = require("../../tools/utils");

/**
 * ProgressBar 命令行进度条
 * @param {string} description 命令行开头的文字信息
 * @param {number} bar_length 进度条的长度(单位：字符)，默认设为 25
 */
class ProgressBar {
	/**
	 *Creates an instance of ProgressBar.
	 * @param {{description?:"Progress",bar_length?:25}} [props={}] {description:"命令行开头的文字信息",bar_length:进度条的长度(单位：字符)，默认设为 25}
	 * @memberof ProgressBar
	 */
	constructor(props = {}) {
		this.description = props.description || "Progress"; // 命令行开头的文字信息
		this.length = props.bar_length || 25; // 进度条的长度(单位：字符)，默认设为 25
		this.description = clicolor.blue.bold(this.description);
		this.instance = null;
	}

	/**
	 * 初始化参数
	 * @static
	 * @param {{description:string,bar_length:25}} [props={}] {description:"命令行开头的文字信息",bar_length:进度条的长度(单位：字符)，默认设为 25}
	 * @returns {ProgressBar} 实例化对象
	 * @memberof ProgressBar
	 */
	static init(props = {}) {
		if (!this.instance) {
			this.instance = new this(props);
		} else {
			this.description = props.description || this.description; // 命令行开头的文字信息
			this.length = props.bar_length || this.bar_length || 25; // 进度条的长度(单位：字符)，默认设为 25
			this.description = clicolor.blue.bold(this.description);
		}
		return this.instance;
	}

	/**
	 * @description 渲染进度条
	 * @author bubao
	 * @param {{
	 * completed:number,
	 * total:number,
	 * hiden?:bool,
	 * type:? bool,
	 * speed?:number,
	 * status?:{
	 * down:string,
	 * status:string
	 * }}} opts {
		completed:number(已完成),
		total:number(总量),
		type: 使用原数据？false使用byte
		hiden:bool(隐藏), false
		speed:number(下载速度)
		status.down:string(下载时文字),
		status.end:string(完成时的文字)
	}
	 * @memberof ProgressBar
	 */
	render(opts) {
		const percent = (opts.completed / opts.total).toFixed(4); // 计算进度(子任务的 完成数 除以 总数)
		const cellNum = Math.floor(percent * this.length); // 计算需要多少个 █ 符号来拼凑图案
		// 拼接黑色条
		let cell = "";
		for (let i = 0; i < cellNum; i += 1) {
			cell += "█";
		}

		// 拼接灰色条
		let empty = "";
		for (let i = 0; i < this.length - cellNum; i += 1) {
			empty += "░";
		}

		cell = clicolor.green.bgBlack.bold(cell);
		opts.completed = clicolor.yellow.bold(
			!opts.type ? byteSize(opts.completed) : opts.completed
		);
		opts.total = clicolor.blue.bold(
			!opts.type ? byteSize(opts.total) : opts.total
		);
		opts.status = opts.status || {};
		this.status =
			(100 * percent).toFixed(2) !== "100.00"
				? opts.status.end || "正在下载"
				: (opts.status.down || "已完成") + "\n";
		let timeText = "";
		if (opts.time) {
			const start = parseInt(opts.time.start / 1000, 10);
			timeText = time(new Date().valueOf() / 1000 - start);
		}

		let speedText = "";
		if (opts.speed) {
			speedText = byteSize(opts.speed) + "/s";
		}
		// 拼接最终文本
		const cmdText =
			`${this.description}:  ${(100 * percent).toFixed(
				2
			)}% ${cell} + ${empty}` +
			`${opts.completed}/${opts.total} ${timeText} ${speedText} ${this.status}`;

		if ((100 * percent).toFixed(2) !== "100.00" || !opts.hiden) {
			slog(cmdText);
		} else {
			slog("");
		}
	}
}

module.exports = ProgressBar;
