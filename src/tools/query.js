/**
 * @author suncg
 * @description 全部接口的默认query集中管理，便于后期维护
 * @date: 2018-2-14
 * @Last Modified by: bubao
 * @Last Modified time: 2019-11-30 23:32:29
 */

// 全部接口的默认query集中管理，便于后期维护
let query = {};
query = {
	zhuanlan: {
		comments: {
			limit: 10,
			offset: 0
		},
		likers: {
			limit: 10,
			offset: 0
		},
		articleList: {
			limit: 10,
			offset: 0
		}
	},
	bilibili: {
		videos: {
			cid: 6689771,
			otype: "json",
			player: 1,
			quality: 2,
			ts: new Date().valueOf() / 1000,
			sign: "dde4c12bdb85dfeefbfdb1b215383488"
		}
	}
};

module.exports = query;
