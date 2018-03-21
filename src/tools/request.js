let { request } = require('../tools/commonModules');

module.exports = req;

class req {
	Get(m, uri, options) {
		return new Promise((resolve, reject) => {
			request(uri, {
				method: m,
				...options
			}, (error, response, body) => {
				if (error) {
					reject(error);
				}
				if (response) {

				}
			})
		})

	}
}