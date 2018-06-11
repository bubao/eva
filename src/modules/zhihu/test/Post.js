/**
 * @author bubao
 * @description
 * @date: 2018-05-21 18:29:38
 * @Last Modified by: bubao
 * @Last Modified time: 2018-06-11 11:51:02
 */
const Post = require('../src/api/Post');
// const config = require('./env.json');
const fs = require('fs');

const { console } = require('../src/config/commonModules');

// Post.info('oh-hard').then((res) => {
// 	fs.writeFile('./nopush/zhuanlanInfo.json', JSON.stringify(res), () => { console.log("zhuanlanInfo"); });
// })

Post.posts('oh-hard').then((res) => {
	fs.writeFile('./nopush/zhuanlanPosts.json', JSON.stringify(res), () => { console.log("zhuanlanPosts"); });
})
