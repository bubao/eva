/**
 * @author bubao
 * @description
 * @date: 2018-03-15
 * @Last Modified by: bubao
 * @Last Modified time: 2018-11-09 18:28:08
 */

const fs = require('fs');
const console = require('better-console');
const url = require('url');
const path = require('path');
const QUERY = require('./query');
const figlet = require('figlet');
const crypto = require('crypto');
const cheerio = require('cheerio');
const request = require('./request');
const { URL, URLSearchParams } = require('url');
const slog = require('single-line-log').stdout;
const clicolor = require('cli-color');

module.exports = {
    fs,
    url,
    URL,
    path,
    slog,
    QUERY,
    figlet,
    crypto,
    cheerio,
    console,
    request,
    clicolor,
    URLSearchParams,
};
