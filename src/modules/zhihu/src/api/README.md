# API文件夹说明


## Topic 话题

话题中有三个分类

- activityTopic：活跃话题
- questionTopic：待回答话题
- essenceTopic：精华话题

### 使用方法

```js
const Topic = require('../src/api/Topic');
/**
 * 活跃话题
 * @param {number|string} topicID 话题ID
 * @param {object} options limit和offset，timeline
 */
Topic.activityTopic(19584970, options).then((res) => {
    fs.writeFileSync('./nopush/activityTopic.json', JSON.stringify(res));
});
/**
 * 未回答的话题
 * @param {number|string} topicID 话题ID
 * @param {object} options limit和offset，timeline
 */
Topic.questionTopic(19584970, options).then((res) => {
    fs.writeFileSync('./nopush/questionTopic.json', JSON.stringify(res));
});
/**
 * 精华话题
 * @param {number|string} topicID 话题ID
 * @param {object} options limit和offset
 */
Topic.essenceTopic(19584970, options).then((res) => {
    fs.writeFileSync('./nopush/essenceTopic.json', JSON.stringify(res));
});
```

`活跃话题`和`待回答话题`可以按时间排序。设置`options`的`timeline`字段为`true`即可使用时间排序抓取。

**`options`可设置参数**

```js
let options = {
    "headers": {
        "authorization": "oauth c3cef7c66a1843f8b3a9e6a1e3160e20",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
    },
    timeline:true,// 设置则按时间排序抓取。
    limit:20,// 抓取长度
    offset:0,// 开始位置
    before_id:flout,
    after_id:flout,
    all:true;
}
```

> 特别提醒：
> 活跃话题的`top_activity`的`before_id`和`after_id`为浮点数，不能手动设置，可以在第一次爬取后获得下次数据的`url`。
> 活跃话题的`timeline_activity`的`offset`和`limit`为浮点数时间戳，不能手动设置，可以在第一次爬取后获得下次数据的`url`。