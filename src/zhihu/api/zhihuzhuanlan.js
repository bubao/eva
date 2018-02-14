// const imgsrc = 'https://pic1.zhimg.com/';
const { _, request, cheerio, ep, url } = require('../config/commonModules.js');
const utils = require('../config/utils.js');
let API = require('../config/api.js');

/**
 * 通用方法
 * @param {string||number} ID 传入ID
 * @param {string} API 传入api
 * @param {string} countName 传入countName
 * @param {Function} infoMethod 传入方法
 */
let universalMethod = (ID, API, countName, infoMethod) => {
    let url = _.template(API)({ postID: ID, columnsID: ID });
    let count = infoMethod(ID).then((c) => {
        return c[countName];
    });
    // console.log(url)
    return new Promise((resolve, reject) => {
        count.then(res1 => {
            return utils.loopMethod(_.assign({
                options: {
                    urlTemplate: url,
                }
            }, utils.rateMethod(res1, 20)))
            // .then(res2 => {
            //     console.log(res2)
            //     resolve(res2)
            // });
        })
    })

};

/**
 * 知乎专栏信息
 * @param {string} columnsID //专栏ID
 */
let zhuanlanInfo = (columnsID) => {
    let urlTemplate = _.template(API.post.columns)({ columnsID });
    let object = {};
    object = {
        url: urlTemplate,
        gzip: true,
    };
    return utils.requestMethod(object);
}

/**
 * 所有关注者信息
 * @param {string} columnsID 专栏ID 
 */
let followers = (columnsID) => {
    // let url = _.template(API.post.followers)({ columnsID });
    // let object = {};
    // let followersCount = zhuanlanInfo(columnsID).then((c) => {
    //     return c.followersCount;
    // });

    // return followersCount.then(res => {
    //     return utils.loopMethod(_.assign({
    //         options: {
    //             urlTemplate: url,
    //             // gzip: true,
    //         }
    //     }, utils.rateMethod(res, 20)));
    // });
    return universalMethod(columnsID, API.post.followers, 'followersCount', zhuanlanInfo);
}
/**
 * 专栏所有post
 * @param {string} columnsID 专栏ID
 */
let zhuanlanPosts = (columnsID) => {
    // let url = _.template(API.post.page)({ columnsID });
    // let object = {};
    // let postsCount = zhuanlanInfo(columnsID).then((c) => {
    //     return c.postsCount;
    // });
    // return postsCount.then(res => {
    //     return utils.loopMethod(_.assign({
    //         options: {
    //             urlTemplate: url,
    //             // gzip: true,
    //         }
    //     }, utils.rateMethod(res, 20)));
    // });
    return universalMethod(columnsID, API.post.page, 'postsCount', zhuanlanInfo);
};

/**
 * 知乎专栏信息
 * @param {number} postID //postID
 */
let postInfo = (postID) => {
    let urlTemplate = _.template(API.post.info)({ postID });
    let object = {};
    object = {
        url: urlTemplate,
        gzip: true,
    };
    return utils.requestMethod(object);
}

/**
 * 专栏文章喜欢者的信息
 * @param {number} postID //postID
 */
let postLikers = (postID) => {
    // let url = _.template(API.post.likers)({ postID });
    // let object = {};
    // let likesCount = postInfo(postID).then((c) => {
    //     return c.likesCount;
    // });
    return new Promise((resolve, reject) => {
        universalMethod(postID, API.post.likers, 'likesCount', postInfo).then(res => {
            // console.log(123)
            resolve(res);
        })
    })
    // return likesCount.then(res => {
    //     return utils.loopMethod(_.assign({
    //         options: {
    //             urlTemplate: url,
    //         }
    //     }, utils.rateMethod(res, 20)));
    // });
}

/**
 * 专栏文章回复的信息
 * @param {number} postID //postID
 * @param {number} count //comments总数
 */
let postComments = (postID, count) => {
    let url = _.template(API.post.comments)({ postID });
    let object = {};
    return utils.loopMethod(_.assign({
        options: {
            urlTemplate: url,
        }
    }, utils.rateMethod(count, 20)));
}

module.exports = {
    zhuanlanInfo,
    zhuanlanPosts,
    followers,
    postInfo,
    postLikers,
    postComments,
};