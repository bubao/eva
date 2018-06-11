/**
 * @author bubao
 * @description
 * @date: 2018-05-17 14:00:09
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-21 19:20:14
 */
const url = require('url');
const cheerio = require('cheerio');
const console = require('better-console');

const QUERY = require('./query');
const { request, h2m, timeout } = require('./../module');

module.exports = {
	url,
	console,
	cheerio,

	h2m,
	QUERY,
	timeout,
	request,
};
