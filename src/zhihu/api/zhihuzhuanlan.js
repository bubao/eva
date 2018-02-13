const imgsrc = 'https://pic1.zhimg.com/';
const { _, request, cheerio, ep } = require('../config/commonModules.js');
let API = require('../config/api.js');

/**
 * 知乎专栏爬虫
 * 
 * getPostsCount
 *      url:专栏的url
 *      callback：回调函数
 */
let getPostsCount = (url, callback) => {
    request(url).then((response) => {
        console.log(response.body)
        callback(response.body);
    });
}

let loop = (object) => {
    // body...
    let urlp = object.urlp + object.writeTimes * 20;
    console.log(urlp)
    request(urlp, (error, response, body) => {
        if (error) {
            throw new Error(error);
        }

        _.forEach(JSON.parse(body), (item, index) => {
            object.allObject[index + object.writeTimes * 20] = item;
        });
        object.writeTimes = object.writeTimes + 1;
        if (object.writeTimes === object.times) {
            ep.emit('got_file', object.allObject);
        } else {
            loop(object);
        }
    });
}

module.exports = function zhihuzhuanlan(postID) {
    let allObject = {};
    getPostsCount(`https://zhuanlan.zhihu.com/${postID}`, (dd) => {
        if (dd) {
            let $ = cheerio.load(dd);
            let postsCount = JSON
                .parse($("textarea#preloadedState").text().replace(/"updated":new Date\("/g, `"updated": "`).replace(/\.000Z"\),/g, `.000Z",`))
                .columns[`${postID}`]
                .postsCount;
            let posts = postsCount % 20;
            let writeTimes = 0;
            let times = (postsCount - posts) / 20;
            let urlp = `https://zhuanlan.zhihu.com/api/columns/${postID}/posts?limit=20&amp;offset=`;
            loop({
                postsCount: postsCount,
                postID: postID,
                writeTimes: writeTimes,
                times: times,
                urlp: urlp,
                allObject: allObject
            });
        }
    });

    return new Promise((resolve, reject) => {
        ep.all('got_file', (response) => {
            // let $ = cheerio.load(response);
            // let postsCount = JSON.parse($("img").forEach(item=>{
            //     item.atta
            // }));
            resolve(response);
        })
    }).then(res => {
        return res;
    })
}
