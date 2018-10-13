/**
 * @author bubao
 * @description 将markdown的图片下载到本地
 * @date: 2018-01-23
 * @Last Modified by: bubao
 * @Last Modified time: 2018-10-13 12:54:19
 */
const fs = require('fs');
const request = require("request");
const slice = require("lodash/slice");
const path = require('path');
// const mkdirp = require('mkdirp');
const { console } = require('../../tools/commonModules');

/**
 *
 * @param {string} p 下载路径
 * @param {string} name 下载路径的文件夹名
 * @param {*} arr 文件中的img url list
 * @param {function} cb callback函数
 */
const loop = (p, name, arr, cb) => {
    if (arr.length) {
        request(arr[0]).pipe(fs.createWriteStream(`${p}/${name}/imgs/${path.basename(arr[0])}`)).on('close', () => {
            loop(slice(arr, 1));
        });
    } else {
        console.log('end');
        if (cb !== undefined) {
            cb();
        }
    }
}
/**
 *
 * @param {string} p 下载路径
 * @param {string} name 下载路径的文件夹名
 * @param {string} markdownPath markdown文件的路径
 * @param {func} cb callback函数
 */
const localImage = (p, name, markdownPath, cb) => {
    const md = fs.readFileSync(markdownPath, 'utf8');
    const all = md.match(/!\[\]\(https.*?\)/g);
    loop(p, name, JSON.parse(JSON.stringify(all).replace(/!\[\]\(/g, "").replace(/\)/g, "")), cb)
}

module.exports = localImage;
