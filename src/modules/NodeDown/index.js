let { ProgressBar } = require('../../tools/utils');
const { path, _, request, fs } = require('../../tools/commonModules');
class NodeDown {
	constructor(props) {
		this.description = props.description;
		this.bar_length = props.bar_length;
		this.pb = new ProgressBar(this.description, this.bar_length);
		this.description = this.pb.description;
	}

	time(d) {
		d = parseInt(d);
		let s, m, h = 0;
		let t = '321';
		if (d < 60) {
			s = d % 60;
			t = s + '秒';
		} else if (d < 60 * 60) {
			s = d % 60;
			m = (d - s) / 60;
			t = this._pad(m) + '分' + this._pad(s) + '秒';
		} else {
			s = d % 60;
			m = (d - s) / 60;
			m = m >= 60 ? 0 : m;
			h = (d - s - m * 60) / 60 / 60;
			t = this._pad(h) + ':' + this._pad(m) + ':' + this._pad(s);
		}
		return t;
	}

	_pad(n, c = 2) {
		n = String(n)
		while (n.length < c) {
			n = '0' + n
		}
		return n
	}
	/**
	 * 
	 * @param {object} opts 配置
	 * {url, localPath, name}
	 * @param {function} callback 
	 */
	download(opts, callback) {
		let read = 0;
		let { name, url, localPath } = opts;
		let start = new Date().valueOf() / 1000, end = 0;
		localPath = path.resolve(localPath || './');
		name = name || path.basename(url);

		this.pb.description = `${name}\n${this.description}`;

		request.get(url).on('response', (response) => {
			if (response.headers['content-length']) {
				this.response = parseInt(response.headers['content-length']);
			} else {
				throw new Error('It is nothing to download!!!')
			}
		}).on('data', (data) => {
			read += data.length;
			this.pb.render({ completed: read, total: this.response, time: { start: start }, status: { down: '正在下载...', end: '完成\n' } });
		}).on('error', (error) => {
			callback(error);
			throw error;
		}).pipe(fs.createWriteStream(path.join(localPath, name))).on('close', () => {
			end = new Date().valueOf() / 1000;
			callback = callback || Function();
			let back = { start: start, end: end, elapsed: this.time(end - start) }
			if (opts.end !== undefined) {
				console.log('\n', this.time(end - start));
			}
			callback(back);
		});
	}
}

module.exports = NodeDown;