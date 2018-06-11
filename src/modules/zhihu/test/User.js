/**
 * @author bubao
 * @description
 * @date: 2018-05-21 13:21:17
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-23 16:04:44
 */

const User = require('../src/api/User');
const config = require('./env.json');
const fs = require('fs');

const { console } = require('../src/config/commonModules');

// User.info('binka', config).then((res) => {
// 	fs.writeFile('./nopush/UserInfo.json', JSON.stringify(res), () => {
// 		console.log('UserInfo');
// 	});
// });

User.followers('bu-bao-88', config).then((res) => {
	fs.writeFile('./nopush/followers.json', JSON.stringify(res), () => {
		console.log('followers');
	});
});
