/**
 * Created by suncg on 2016/12/26.
 */
// 全部接口的默认query集中管理，便于后期维护

let query = {};
query = {
	Topic: {
		timeline_question: {
			offset: 0,
			limit: 10,
		},
		top_activity: {
			next: {
				after_id: 4591.28649,
				limit: 10,
			},
			previous: {
				before_id: 0,
				limit: 10,
			},
		}
	},
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
};

module.exports = query;
