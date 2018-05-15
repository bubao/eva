/**
 * @author suncg
 * @description 全部接口的默认query集中管理，便于后期维护
 * @date: 2018-2-14
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-15 18:41:43
 */
/*
 * @Author: suncg 
 * @Date: 2018-05-15 2016/12/26 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-15 17:45:48
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
			otype: 'json',
			player: 1,
			quality: 2,
			ts: new Date().valueOf() / 1000,
			sign: 'dde4c12bdb85dfeefbfdb1b215383488'
		}
	}
};

module.exports = query;