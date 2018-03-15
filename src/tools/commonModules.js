const fs = require('fs');
const url = require('url');
const _ = require('lodash');
const path = require('path');
const QUERY = require('./query');
const { JSDOM } = require('jsdom');
const cheerio = require('cheerio');
const request = require('request');
const Promise = require('bluebird');
const { URL, URLSearchParams } = require('url');
const req = Promise.promisify(require('request'));
const slog = require('single-line-log').stdout;
const clicolor = require('cli-color');

module.exports = {
	_,
	req,
	url,
	URL,
	path,
	JSDOM,
	QUERY,
	cheerio,
	Promise,
	request,
	URLSearchParams,
	slog,
	clicolor,
};