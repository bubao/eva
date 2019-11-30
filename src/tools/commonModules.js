/**
 * @author bubao
 * @description
 * @date: 2018-03-15
 * @Last Modified by: bubao
 * @Last Modified time: 2019-11-30 22:48:07
 */

const fs = require('fs');
const console = require('better-console');
const url = require('url');
const path = require('path');
const QUERY = require('./query');
const table = require('./table');
const figlet = require('figlet');
const crypto = require('crypto');
const cheerio = require('cheerio');
const PromiseRequest = require('self-promise-request').init();
const filenamify = require('filenamify');
const { URL, URLSearchParams } = require('url');
const slog = require('single-line-log').stdout;
const clicolor = require('cli-color');

const request = PromiseRequest.request

module.exports = {
	fs,
	url,
	URL,
	path,
	slog,
	QUERY,
	table,
	figlet,
	filenamify,
	crypto,
	cheerio,
	console,
	request,
	clicolor,
	URLSearchParams,
};
