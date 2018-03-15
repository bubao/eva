/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description  zhihu api  url template ，知乎api 接口模板
 *
 */
'use strict';

const zhihu = 'https://www.zhihu.com';
const zhuanlan = 'https://zhuanlan.zhihu.com';
const zhimg = 'https://pic1.zhimg.com';

module.exports = {
	zhihu,
	zhuanlan,
	zhimg,
	topic_url: zhihu + '/topic/',
	post: {
		info: zhuanlan + '/api/posts/<%= postID%>',
		likers: zhuanlan + '/api/posts/<%= postID%>/likers',
		columns: zhuanlan + '/api/columns/<%= columnsID%>',
		page: zhuanlan + '/api/columns/<%= columnsID %>/posts',
		// zhuanlan: zhuanlan + '/api/columns/',
		comments: zhuanlan + '/api/posts/<%= postID%>/comments',
		followers: zhuanlan + '/api/columns/<%= columnsID%>/followers',
	},
	answer: {
		likers: zhihu + '/node/AnswerFullVoteInfoV2',
		voters: zhihu + '/answer/<%= answerId %>/voters_profile',
	},
	user: {
		info: zhihu + '/node/MemberProfileCardV2',
	},
	collection: {
		// full url: http://www.zhihu.com/collection/25547043?page=1
		url: zhihu + '/collection/',
	},
};