const fs = require('fs');
const console = require('better-console');
const url = require('url');
const path = require('path');
const QUERY = require('./query');
const crypto = require('crypto');
const cheerio = require('cheerio');
const request = require('./request');
const { URL, URLSearchParams } = require('url');
const slog = require('single-line-log').stdout;
const clicolor = require('cli-color');

module.exports = {
	// _,
	fs,
	url,
	console,
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