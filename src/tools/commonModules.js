const fs = require('fs');
const url = require('url');
const _ = require('lodash');
const path = require('path');
const QUERY = require('./query');
const crypto = require('crypto');
const cheerio = require('cheerio');
const request = require('./request');
const { URL, URLSearchParams } = require('url');
const slog = require('single-line-log').stdout;
const clicolor = require('cli-color');

module.exports = {
	_,
	fs,
	url,
	URL,
	path,
	QUERY,
	cheerio,
	crypto,
	request,
	URLSearchParams,
	slog,
	clicolor,
};