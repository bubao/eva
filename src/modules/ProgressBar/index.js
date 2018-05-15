/**
 * @author bubao 
 * @description ProgressBar 命令行进度条
 * @date: 2018-03-15
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-15 18:46:06
 */
const { slog, clicolor } = require('../../tools/commonModules');
const { time, byteSize } = require('../../tools/utils');

/**
 * ProgressBar 命令行进度条
 * @param {string} description 命令行开头的文字信息
 * @param {number} bar_length 进度条的长度(单位：字符)，默认设为 25
 */
class ProgressBar {
	constructor(props) {
		this.description = props.description || 'Progress';    // 命令行开头的文字信息
		this.length = props.bar_length || 25;           // 进度条的长度(单位：字符)，默认设为 25
		this.description = clicolor.blue.bold(this.description);
	}

	/**
	 * @description 渲染进度条
	 * @author bubao
	 * @param {object} opts 
	 * @memberof ProgressBar
	 */
	render(opts) {
		const percent = (opts.completed / opts.total).toFixed(4);  // 计算进度(子任务的 完成数 除以 总数)
		const cellNum = Math.floor(percent * this.length);       // 计算需要多少个 █ 符号来拼凑图案

		// 拼接黑色条
		let cell = '';
		for (let i = 0; i < cellNum; i += 1) {
			cell += '█';
		}

		// 拼接灰色条
		let empty = '';
		for (let i = 0; i < this.length - cellNum; i += 1) {
			empty += '░';
		}

		cell = clicolor.green.bgBlack.bold(cell);
		opts.completed = clicolor.yellow.bold(byteSize(opts.completed));
		opts.total = clicolor.blue.bold(byteSize(opts.total));
		this.status = (100 * percent).toFixed(2) === 100.00 ? opts.status.end || '正在下载' : opts.status.down || '已完成';
		// 拼接最终文本
		const cmdText = `${this.description}:  ${(100 * percent).toFixed(2)}% ${cell} + ${empty} ${opts.completed}/${opts.total}  ${time(new Date().valueOf() / 1000 - parseInt(opts.time.start, 10))} ${this.status}`;

		if ((100 * percent).toFixed(2) !== '100.00' || !opts.hiden) {
			slog(cmdText);
		} else {
			slog('');
		}
	};
}

module.exports = ProgressBar;