/**
 * @description:
 * @author: bubao
 * @date: 2018-03-15 14:06:45
 * @last author: bubao
 * @last edit time: 2021-02-06 18:34:54
 */

const ProgressBar = require("../ProgressBar");
const { Downloader } = require("self-promise-request");
const { path, parseURL } = require("../../tools/commonModules");

class NodeDown {
	constructor(props) {
		this.description = props.description;
		this.bar_length = props.bar_length;
		this.pb = ProgressBar.init(props);
		this.description = this.pb.description;
		this.instance = null;
	}

	/**
	 * 单例初始化
	 * @static
	 * @param {any} props {description:string(显示文案),bar_length:number(显示长度)}
	 * @returns {any} 实例
	 * @memberof NodeDown
	 */
	static init(props) {
		if (!this.instance) {
			this.instance = new this(props);
		} else {
			this.description = this.pb.description;
			this.bar_length = props.bar_length;
		}
		return this.instance;
	}

	/**
	 * 下载器
	 * @param {object} opts 配置
	 * {url, localPath, name}
	 * @param {function} callback
	 */
	async download(opts) {
		let { name = "a", out } = opts;
		const { url, hiden } = opts;
		out = path.resolve(out || "./");
		name = name || path.basename(parseURL(url).basename);
		this.pb.description = `${name}\n${this.description}`;
		const that = this;
		const downloader = Downloader.init();
		downloader.on("progress", function(data) {
			that.pb.render(data);
		});
		await downloader.request({
			uri: url,
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
				"X-Requested-With": "XMLHttpRequest"
			},
			hiden,
			read: opts.read || 0,
			pipe: path.join(out, name)
		});
	}
}

module.exports = NodeDown;
