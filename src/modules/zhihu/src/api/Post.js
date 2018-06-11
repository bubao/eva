/**
 * @author bubao
 * @description
 * @date: 2018-02-13
 * @Last Modified by: bubao
 * @Last Modified time: 2018-06-11 11:57:14
 */

const { request } = require('../config/commonModules');
const API = require('../config/api');
const assign = require('lodash/assign');
const template = require('lodash/template');
const { loopMethod, rateMethod } = require('../config/utils');

/**
 * 通用方法
 * @param {string||number} ID 传入ID
 * @param {string} api 传入api
 * @param {string} countName 传入countName
 * @param {Function} infoMethod 传入方法
 */
const universalMethod = async (ID, api, countName, infoMethod) => {
    const urlTemplate = template(api)({ postID: ID, columnsID: ID });
    const count = (await infoMethod(ID))[countName];
    return new Promise((resolve) => {
        loopMethod(
            assign(
                {
                    options: {
                        urlTemplate,
                    }
                },
                rateMethod(count, 20)
            ), resolve);
    });

};

/**
 * 知乎专栏信息
 * @param {string} columnsID //专栏ID
 */
const info = async (columnsID) => {
    const urlTemplate = template(API.post.columns)({ columnsID });
    let object = {};
    object = {
        url: urlTemplate,
        gzip: true,
    };
    return JSON.parse((await request(object)).body);
}
/**
 * 专栏所有post
 * @param {string} columnsID 专栏ID
 */
const posts = (columnsID) => {
    return universalMethod(columnsID, API.post.page, 'postsCount', info);
};

module.exports = {
    info,
    posts,
}
