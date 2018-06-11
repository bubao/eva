/**
 * @author bubao 
 * @description 
 * @date: 2018-2-13 14:13:30 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-06-11 10:34:25
 */

const Post = require('./Post');
const User = require('./User');
const Topic = require('./Topic');
const API = require('../config/api')
const template = require('lodash/template');

const APIURL = (urlToken, mode, detail) => {
	return template(API[mode][detail])({ url_token: urlToken });
}

module.exports = {
	Post,
	User,
	Topic,
	APIURL,
};
