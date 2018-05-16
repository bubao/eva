/**
 * @author bubao 
 * @description 
 * @date: 2018-01-23
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-16 18:04:41
 */

const fs = require('fs');
const ebook = require('./ebook.js');
const times = require('lodash/times');
const compact = require('lodash/compact');
const TurndownService = require('turndown');
const { console } = require('../../tools/commonModules');

const imgsrc = '![](https://pic1.zhimg.com/';
const Turndown = new TurndownService();

Turndown.addRule('indentedCodeBlock', {
	filter(node, options) {
		return (
			options.codeBlockStyle === 'indented' &&
			node.nodeName === 'PRE' &&
			node.firstChild &&
			node.firstChild.nodeName === 'CODE'
		);
	},
	replacement(content, node) {
		return `'\n\`\`\`${node.firstChild.getAttribute('class')}\n${content}\n\`\`\`\n`;
	}
});

/**
 * 转换内容，将部分不适合转换的标签改为合适转换的标签
 * @param {string} content 知乎专栏的Markdown内容
 */
const replaceContent = (content) => {
	return content.replace(/<br>/g, '\n').replace(/<code lang="/g, '<pre><code class="language-').replace(/\n<\/code>/g, '\n</code></pre>');
}

/**
 * 转换内容，连接转换为绝对连接
 * @param {string} content 知乎专栏的Markdown内容
 */
const replaceImage = (content) => {
	const reg = /<noscript>.*?<\/noscript>/g;
	const reg2 = /src="(.*?)"/;
	let src = content.match(reg);
	const imageList = [];
	src = compact(src); // 使用lodash ，即便是src为null也能够转为空的数组
	times(src.length, (imageNum) => {
		imageList.push(`![](${src[imageNum].match(reg2)[1]})`);
	});
	times(src.length, (imageNum) => {
		content = content.replace(src[imageNum], imageList[imageNum]);
	});
	return content.replace(/!\[\]\(/g, imgsrc);
}

/**
 * 转换标题，因为windows特殊字符不能做文件名
 * @param {string} title 标题
 */
const replaceTitle = (title) => {
	const pattern = new RegExp("[`~!@#$^&'*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
	let rs = '';

	times(title.length, (k) => {
		const rs2 = title.substr(k, 1).replace(/"/, ''); // 使用正则表达式单独去除双引号
		rs += rs2.replace(pattern, '');
	});
	return Buffer.from(rs);
}

/**
 * 转换时间
 * @param {string} time 时间
 */
const replaceTime = (time) => {
	return time.replace("T", ",").replace("+08:00", "");
}

/**
 * 知乎专栏HTML2MD
 * markdown(path, zhihuId, res[, format])
 * @param {string} path 下载地址
 * @param {string} zhihuId 知乎专栏ID
 * @param {string} zhihuJson 知乎专栏的内容
 * @param {string} format 指定为ebook，或者留空，还未完善
 */
const markdown = (path, zhihuId, zhihuJson, format) => {
	times(Object.getOwnPropertyNames(zhihuJson).length, (i) => {
		zhihuJson[i].content = replaceContent(zhihuJson[i].content);
		let content = Turndown.turndown(zhihuJson[i].content);
		content = replaceImage(content);
		let { title } = zhihuJson[i];
		title = replaceTitle(title);

		const time = `${zhihuJson[i].publishedTime}`;
		const T = replaceTime(time);
		const Ti = T.split(',')[0];

		const postId = zhihuJson[i].url;
		const copyRight = `\n\n知乎原文: [${title}](https://zhuanlan.zhihu.com${postId})\n\n\n`;
		const header = `# ${title}\n\ndate: ${T.replace(",", " ")} \n\n\n`;

		if (!fs.existsSync(`${path}/${zhihuId}`)) {
			fs.mkdirSync(`${path}/${zhihuId}`);
		}
		// 如果没有指定目录，创建之
		fs.writeFileSync(`${path}/${zhihuId}/${Ti};${title}.md`, header, 'utf8', (err) => {
			if (err) throw err;
			console.log(`❌ ${Ti};${title}.md`);
		});

		fs.appendFile(`${path}/${zhihuId}/${Ti};${title}.md`, content + copyRight, 'utf8', (err) => {
			if (err) throw err;
			console.log(`🍅  ${Ti};${title}.md`);
			if (i === zhihuJson.length - 1 && format === "ebook") {
				const ebookObj = (fs.readFileSync(`${path}/${zhihuId}/0.json`))[0];
				ebook(path, zhihuId, {
					title: zhihuId,
					author: ebookObj.author.name,
					content: []
				});
			}
		});
	});
};

module.exports = markdown;