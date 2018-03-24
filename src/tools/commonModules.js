const fs = require('fs');
const url = require('url');
const _ = require('lodash');
const path = require('path');
const QUERY = require('./query');
const crypto = require('crypto');
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
	fs,
	req,
	url,
	URL,
	path,
	JSDOM,
	QUERY,
	cheerio,
	Promise,
	crypto,
	request,
	URLSearchParams,
	slog,
	clicolor,
};