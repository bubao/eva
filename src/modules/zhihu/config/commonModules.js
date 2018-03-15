const url = require('url');
const cheerio = require('cheerio');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const _ = require('lodash');
const QUERY = require('./query');
const EventProxy = require('eventproxy');
const ep = new EventProxy();

module.exports = {
	url,
	cheerio,
	Promise,
	request,
	_,
	ep,
	QUERY,
};