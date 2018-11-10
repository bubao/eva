/**
 * @author bubao
 * @description 知乎的API
 * @date: 2018-05-17 12:27:02
 * @Last Modified by: bubao
 * @Last Modified time: 2018-11-11 01:13:26
 */

const zhihu = 'https://www.zhihu.com';
const zhuanlan = 'https://zhuanlan.zhihu.com';
const zhimg = 'https://pic1.zhimg.com';

module.exports = {
	zhihu,
	zhuanlan,
	zhimg,
	post: {
		info: `${zhuanlan}/api/posts/<%= postID%>`,
		columns: `${zhuanlan}/api/columns/<%= columnsID%>`,
		page: `${zhuanlan}/api/columns/<%= columnsID %>/posts`,
	}
};
