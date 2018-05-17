/**
 * @author bubao 
 * @description 知乎的API
 * @date: 2018-05-17 12:27:02 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-17 13:05:56
 */
/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description  zhihu api  url template ，知乎api 接口模板
 *
 */

const zhihu = 'https://www.zhihu.com';
const zhuanlan = 'https://zhuanlan.zhihu.com';
const zhimg = 'https://pic1.zhimg.com';

module.exports = {
	zhihu,
	zhuanlan,
	zhimg,
	// topic_url: zhihu + '/topic/',
	topic: {
		timeline_question: `${zhuanlan}/api/v4/topics/<%= topicID%>/feeds/timeline_question`,
		top_activity: `${zhuanlan}/api/v4/topics/<%= topicID%>/feeds/top_activity`,
	},
	post: {
		info: `${zhuanlan}/api/posts/<%= postID%>`,
		likers: `${zhuanlan}/api/posts/<%= postID%>`,
		columns: `${zhuanlan}/api/posts/<%= postID%>`,
		page: `${zhuanlan}/api/columns/<%= columnsID %>/posts`,
		// zhuanlan: zhuanlan + '/api/columns/',
		comments: `${zhuanlan}/api/posts/<%= postID%>/comments`,
		followers: `${zhuanlan}/api/columns/<%= columnsID%>/followers`,
	},
	answer: {
		likers: `${zhihu}/node/AnswerFullVoteInfoV2`,
		voters: `${zhihu}/answer/<%= answerId %>/voters_profile`,
	},
	user: {
		// info: zhihu + '/node/MemberProfileCardV2',
		info: `${zhihu}/people/<%= qID %>/pins`,
		zhuanlansFocus: `${zhihu}/api/v4/members/<%= qID %>/following-columns`,
	},
	collection: {
		// full url: http://www.zhihu.com/collection/25547043?page=1
		url: `${zhihu}/collection/`,
	},
};