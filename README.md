# README

## nodc

这是个node 工具集，目前只有知乎专栏爬虫的功能，整合之前的 [GetZhiHuZhuanLan](https://github.com/bubao/GetZhiHuZhuanLan),以后还会加入天气，翻译，全文分词排序关键字，todolist等功能。

## 安装

由于我没有npmjs账号，只能这样安装了
```sh
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

## 待办

- [x] 知乎爬虫
- [x] 天气预报
- [ ] 结巴分词全文统计排序关键词
- [ ] 彩色输出
- [ ] 翻译

## 最后说点事

我希望这个小项目能更多的人参与进来，一起DIY自己的命令行工具集。