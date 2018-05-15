/**
 * @author bubao 
 * @description email
 * @date: 2018-03-26
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-15 18:49:25
 */
const config = require('./config');
const email = require('./email');
const { console } = require('../../tools/commonModules');

// config.mailOptions.markdown = fs.readFileSync('./test/1.md', 'utf-8');
config.mailOptions.markdown = "# fs.readFileSync('./test/1.md', 'utf-8')";
config.mailOptions.subject = "# fs.readFileSync('./test/1.md', 'utf-8')";
config.mailOptions.date = new Date();
const test = async () => {
	console.log(await email(config.createTransport, config.mailOptions));
}
test()