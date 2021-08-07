/**
 * @Description:
 * @author: bubao
 * @Date: 2018-03-15 13:51:46
 * @LastEditors: bubao
 * @LastEditTime: 2021-08-07 21:26:59
 */

const fs = require("fs");
const console = require("better-console");
const url = require("url");
const path = require("path");
const QUERY = require("./query");
const table = require("./table");
const figlet = require("figlet");
const crypto = require("crypto");
const cheerio = require("cheerio");
const PromiseRequest = require("self-promise-request").init();
// const filenamify = require("filenamify");
const { URL, URLSearchParams } = require("url");
const slog = require("single-line-log").stdout;
const clicolor = require("cli-color");

const request = PromiseRequest.request;

module.exports = {
	fs,
	url,
	URL,
	path,
	slog,
	QUERY,
	table,
	figlet,
	// filenamify,
	crypto,
	cheerio,
	console,
	request,
	clicolor,
	URLSearchParams,
	PromiseRequest
};
