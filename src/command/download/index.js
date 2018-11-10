/**
 * @author bubao
 * @description 命令行下载器
 * @date: 2018-03-15 19:06:50
 * @Last Modified by: bubao
 * @Last Modified time: 2018-11-11 00:21:35
 */

const { path } = require('../../tools/commonModules');
const { fileName, defaultName } = require('../../tools/utils');
const NodeDown = require('../../modules/NodeDown');

function download(params) {
    let { name } = params;
    const { url, description, length, out, hiden } = params;
    name = fileName(path.basename(name || url), defaultName(url));
    new NodeDown({
        bar_length: length,
        description: description || '下载进度'
    }).download({
        url,
        name,
        out,
        hiden
    });
}

module.exports = download;
