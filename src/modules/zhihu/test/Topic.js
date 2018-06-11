/**
 * @author bubao
 * @description
 * @date: 2018-05-21 13:23:05
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-21 13:24:40
 */
const topic = require('../src/api/Topic');
const config = require('./env.json');
const fs = require('fs');

const { console } = require('../src/config/commonModules');

topic.info(19584970, config).then((res) => {
	fs.writeFile('./nopush/topicInfo.json', JSON.stringify(res), () => {
		console.log('topicInfo');
	});
});

topic.activity(19584970, config).then((res) => {
	fs.writeFile('./nopush/topicActivity.json', JSON.stringify(res), () => {
		console.log('topicActivity');
	});
});

topic.parent(19584970, config).then((res) => {
	fs.writeFile('./nopush/topicParent.json', JSON.stringify(res), () => {
		console.log('topicParent');
	});
});

topic.children(19584970, config).then((res) => {
	fs.writeFile('./nopush/topicChildren.json', JSON.stringify(res), () => {
		console.log('topicChildren');
	});
});

topic.followers(19584970, config).then((res) => {
	fs.writeFile('./nopush/topicFollowers.json', JSON.stringify(res), () => {
		console.log('topicFollowers');
	});
});

topic.essence(19584970, config).then((res) => {
	fs.writeFile('./nopush/topicEssence.json', JSON.stringify(res), () => {
		console.log('topicEssence');
	});
});

topic.bestAnswerers(19584970, config).then((res) => {
	fs.writeFile('./nopush/topicBestAnswerers.json', JSON.stringify(res), () => {
		console.log('topicBestAnswerers');
	});
});

topic.timelineActivity(19584970, config).then((res) => {
	fs.writeFile('./nopush/topicTimelineActivity.json', JSON.stringify(res), () => {
		console.log('topicTimelineActivity');
	});
});

topic.timelineQuestion(19584970, config).then((res) => {
	fs.writeFile('./nopush/topicTimelineQuestion.json', JSON.stringify(res), () => {
		console.log('topicTimelineQuestion');
	});
});
