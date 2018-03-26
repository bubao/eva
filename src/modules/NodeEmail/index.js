let config = require('./src/config');
let email = require('./src/email');
let fs = require('fs')

// config.mailOptions.markdown = fs.readFileSync('./test/1.md', 'utf-8');
config.mailOptions.markdown = "# fs.readFileSync('./test/1.md', 'utf-8')";
config.mailOptions.subject = "# fs.readFileSync('./test/1.md', 'utf-8')";
config.mailOptions.date = new Date();
let test = async () => {
	console.log(await email(config.createTransport, config.mailOptions));
}
test()