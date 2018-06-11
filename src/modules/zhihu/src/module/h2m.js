/**
 * @author bubao
 * @description
 * @date: 2018-01-23
 * @Last Modified by: bubao
 * @Last Modified time: 2018-06-11 10:42:37
 */

const times = require('lodash/times');
const compact = require('lodash/compact');
const TurndownService = require('turndown');
const console = require('better-console');

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
		imageList.push(`\n\n![](${src[imageNum].match(reg2)[1]})\n\n`);
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
 * markdown(path, postId, res, contentName)
 * @param {string} path 下载地址
 * @param {string} postId 知乎专栏ID
 * @param {string} zhihuJson 知乎专栏的内容
 * @param {string} contentName 指定为内容的属性名
 */
const markdown = (path, postId, zhihuJson, contentName) => {
	const obj = {};
	if (!(path && postId && zhihuJson && contentName)) {
		console.error('Error in h2m');
		return obj;
	}

	times(Object.getOwnPropertyNames(zhihuJson).length, (i) => {
		const replace = replaceContent(zhihuJson[i][contentName]);
		let content = Turndown.turndown(replace);
		content = replaceImage(content);
		let { title } = zhihuJson[i];
		title = replaceTitle(title);

		const time = `${zhihuJson[i].publishedTime}`;
		const T = replaceTime(time);
		const Ti = T.split(',')[0];

		const postUrl = zhihuJson[i].url;
		const copyRight = `\n\n知乎原文: [${title}](https://zhuanlan.zhihu.com${postUrl})\n\n\n`;
		const header = `# ${title}\n\ndate: ${T.replace(",", " ")} \n\n\n`;

		obj[i] = {
			before: zhihuJson[i][contentName],
			content,
			copyRight,
			time: Ti,
			header,
		}
	});
	return obj;
};

module.exports = markdown;
