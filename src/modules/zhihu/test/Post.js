const { Post } = require('../api');
const fs = require('fs');
const { console } = require('../../../tools/commonModules');

Post.postComments(33056963, 20).then((res) => {
	fs.writeFile('./postComments.json', JSON.stringify(res), () => { console.log("postComments"); });
})

Post.postInfo(33056963).then(res => {
	fs.writeFile('./postInfo.json', JSON.stringify(res), () => { console.log("postInfo"); });
});

Post.postLikers(33056963).then(res => {
	fs.writeFile('./postLikers.json', JSON.stringify(res), () => { console.log("postLikers"); });
});

Post.zhuanlanInfo('smzdm').then(res => {
	fs.writeFile('./zhuanlanInfo.json', JSON.stringify(res), () => { console.log("zhuanlanInfo"); });
});

Post.followers('smzdm').then(res => {
	fs.writeFile('./followers.json', JSON.stringify(res), () => { console.log("followers"); });
});

Post.zhuanlanPosts('smzdm').then(res => {
	fs.writeFile('./zhuanlanPosts.json', JSON.stringify(res), () => { console.log("zhuanlanPosts"); });
});
