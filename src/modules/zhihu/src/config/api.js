/**
 * @author bubao
 * @description 知乎的API
 * @date: 2018-05-17 12:27:02
 * @Last Modified by: bubao
 * @Last Modified time: 2018-06-11 11:41:39
 */

const zhihu = 'https://www.zhihu.com';
const zhuanlan = 'https://zhuanlan.zhihu.com';
const zhimg = 'https://pic1.zhimg.com';

module.exports = {
	zhihu,
	zhuanlan,
	zhimg,
	topic: {
		info: `${zhihu}/api/v4/topics/<%= topicID%>?include=introduction%2Cquestions_count%2Cbest_answers_count%2Cfollowers_count%2Cis_following`,

		timelineQuestion: `${zhihu}/api/v4/topics/<%= topicID%>/feeds/timeline_question`,
		timelineActivity: `${zhihu}/api/v4/topics/<%= topicID%>/feeds/timeline_activity`,
		essence: `${zhihu}/api/v4/topics/<%= topicID%>/feeds/essence`,
		topQuestion: `${zhihu}/api/v4/topics/<%= topicID%>/feeds/top_question`,
		topActivity: `${zhihu}/api/v4/topics/<%= topicID%>/feeds/top_activity`,

		bestAnswerers: `${zhihu}/api/v4/topics/<%= topicID%>/best_answerers?limit=3`,
		followers: `${zhihu}/api/v4/topics/<%= topicID%>/followers?include=data%5B%2A%5D.gender%2Canswer_count%2Carticles_count%2Cfollower_count%2Cis_following%2Cis_followed&limit=20&offset=20`,// 话题关注者
		parent: `${zhihu}/api/v3/topics/<%= topicID%>/parent`,// 话题的父话题
		children: `${zhihu}/api/v3/topics/<%= topicID%>/children`,// 话题的子话题
		organize: `${zhihu}/topic/<%= topicID%>/organize/entire`,// 话题结构
		entire: `${zhihu}/topic/<%= topicID%>/organize/entire?child=<%= ?childID%>&parent=<%= topicID%>`,// 查询下一级的话题
	},
	post: {
		// info: `${zhuanlan}/api/posts/<%= postID%>`,
		info: `${zhihu}/api/v4/columns/<%= columnsID%>?include=title%2Cintro%2Cdescription%2Cimage_url%2Carticles_count%2Cfollowers%2Cis_following%2Clast_article.created`,
		page: `${zhuanlan}/api/columns/<%= columnsID %>/posts`,
		columns: `${zhuanlan}/api/columns/<%= columnsID%>`,
		articles: `${zhihu}/api/v4/columns/<%= columnsID%>/articles?include=data%5B*%5D.admin_closed_comment%2Ccomment_count%2Csuggest_edit%2Cis_title_image_full_screen%2Ccan_comment%2Cupvoted_followees%2Ccan_open_tipjar%2Ccan_tip%2Cvoteup_count%2Cvoting%2Ctopics%2Creview_info%2Cauthor.is_following`,
		likers: `${zhuanlan}/api/posts/<%= postID%>`,
		// columns: `${zhuanlan}/api/columns/<%= columnsID%>`,
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
		// info: `${zhihu}/people/<%= url_token %>/pins`,
		info: `${zhihu}/api/v4/members/<%= url_token %>?include=allow_message%2Cis_followed%2Cis_following%2Cis_org%2Cis_blocking%2Cemployments%2Canswer_count%2Cfollower_count%2Carticles_count%2Cgender%2Cbadge[%3F(type%3Dbest_answerer)].topics`,
		followers: `${zhihu}/api/v4/members/<%= url_token %>/followers?include=data%5B*%5D.answer_count%2Carticles_count%2Cgender%2Cfollower_count%2Cis_followed%2Cis_following%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=0&limit=20`,
		column_contributions: `${zhihu}/api/v4/members/<%= url_token %>/column-contributions?include=data%5B*%5D.column.intro%2Cfollowers%2Carticles_count&offset=0&limit=20`,
		zhuanlansFocus: `${zhihu}/api/v4/members/<%= url_token %>/following-columns?include=data%5B*%5D.intro%2Cfollowers%2Carticles_count&offset=0&limit=20`,
	},
	collection: {
		// full url: http://www.zhihu.com/collection/25547043?page=1
		url: `${zhihu}/collection/`,
	},
};
