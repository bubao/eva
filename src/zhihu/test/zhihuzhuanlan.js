let zhihu = require('../api/zhihuzhuanlan.js');
let fs = require('fs')
zhihu.postComments(33056963).then((response) => {
	console.log(response)
	fs.writeFile('./PostComments.json', JSON.stringify(response), (err, res) => {
	})
})


// zhihu.postInfo(33056963).then(res => {
// 	fs.writeFile('./postInfo.json', JSON.stringify(res), () => { console.log("postInfo") })
// });

// zhihu.postLikers(33056963).then(res => {
// 	fs.writeFile('./postLikers.json', JSON.stringify(res), () => { console.log("postLikers") })
// });

// zhihu.zhuanlanInfo('smzdm').then(res => {
// 	fs.writeFile('./zhuanlanInfo.json', JSON.stringify(res), () => {
// 		console.log("zhuanlanInfo")
// 	})
// });

// zhihu.followers('smzdm').then(res => {
// 	console.log(res)
// 	fs.writeFile('./followers.json', JSON.stringify(res), () => { console.log("followers") })
// });

// zhihu.zhuanlanPosts('smzdm').then(res => {
// 	fs.writeFile('./zhuanlanPosts.json', JSON.stringify(res), () => { console.log("zhuanlanPosts") })
// });
