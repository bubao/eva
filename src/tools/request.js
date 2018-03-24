let { request } = require('../tools/commonModules');

class reqp {
	constructor() {
		this.reqcb = reqcb.bind(this);
		req = req.bind(this);
	}

	async Get(options, cb) {
		if (cb) {
			return await reqcb(options);
		}
		return await req(options);
	}
}

let reqcb = async (options) => {
	return await new Promise(async (resolve) => {
		request(options, (error, response, body) => {
			resolve({ error, response, body })
		});
	});
}
async function req(options) {
	return await new Promise(async resolve => {
		resolve(request(options));
	});
}


module.exports = new reqp;