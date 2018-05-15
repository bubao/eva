# README

## nodc

nodc 是一个 node 脚本工具集，现在已经有把[知乎专栏爬虫](https://github.com/bubao/GetZhiHuZhuanLan)和中央天气预报加到里面，以后还会加入一些 node 小工具进去。同时欢迎各位喜欢这个项目，想 diy 自己的工具集的朋友参与进来。

## 安装

由于我没有 npmjs 账号，只能这样安装了
```sh
# 获取源码
$ git clone https://github.com/bubao/nodc
# 修改 index.js 第一行，换成自己 node 运行路径

# 项目的根目录下
$ sudo npm i -g
```

## 使用

```sh
# 查看帮助
$ nodc -h
# 知乎爬虫完整子命令
$ nodc cr [zhihuzhuanlanId] -o <path> 
# 默认路径为当前文件夹下
$ nodc cr [zhihuzhuanlanId]
# 默认只爬取 learnreact 专栏
$ nodc cr
# 天气预报完整子命令
$ nodc wt [townName] -d
# 天气基本信息
$ nodc wt [townName]
# 默认深圳天气
$ nodc wt 
```

更多使用方法请执行`$ nodc -h`看帮助。

## 已完成

- [x] 知乎专栏爬虫
- [x] 中央天气预报
- [x] 带进度条的下载器

## 正在进行

- [ ] 使用node和markdown发邮件到指定邮箱
- [ ] 完成bilibili下载器，api存在bug
- [ ] 带进度条的下载器还需要进一步完善

## 待办

- [ ] 做一个Node版本的you-get下载器
- [ ] 结巴分词全文统计排序关键词
- [ ] 彩色输出
- [ ] 翻译
- [ ] 纪念日提醒
- [ ] 每日小tag

### 知乎专栏爬虫

这个项目其实还有很多小 bug，`code`标签转换成 markdown 时是单反引号。目前的 markdown 转换工具使用的是 [h2m](https://github.com/island205/h2m) ，如果有更好的工具请告知我，让我能尽快完善这个小爬虫，谢谢。

### 中央天气预报

这个项目用了[-API](https://github.com/jokermonn/-Api) 提供的 api 写的天气查询，目前还不是很完善，但是已经可以用了，后续继续做些小细节上的工作。

## 带进度条的下载器

这个使用的是request模块做的下载器，其实是为了练手写的。实际上已经可以使用来下载东西了。

## 最后说点事

我希望这个小项目能更多的人参与进来，一起DIY自己的命令行工具集。