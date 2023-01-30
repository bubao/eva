# eva

eva 是一个 node 脚本工具集，现在已经有把 [知乎专栏爬虫](https://github.com/bubao/zhihu-zhuanlan)~~和中央天气预报加到里面~~，以后还会加入一些 node 小工具进去。同时欢迎各位喜欢这个项目，想 diy 自己的工具集的朋友参与进来。

## 安装

由于我没有 npmjs 账号，只能这样安装了，需要先安装 cnpm。

```sh
# 获取源码
$ git clone https://github.com/bubao/eva
# 项目的根目录下
$ cd eva
# 安装
$ cnpm i -g .
# 初始化更新
$ eva update
```

## 更新

当有更新时，使用下面的命令即可更新版本

```sh
$ eva update
```

## 使用

更多使用方法请执行`$ eva -h`看帮助。

```sh
# 查看帮助
$ eva -h
```

### 知乎专栏爬虫

知乎专栏爬虫已分离成独立模块 [zhihu-zhuanlan](https://github.com/bubao/zhihu-zhuanlan)，基本能用。

通过这个命令，能获取到指定知乎专栏的全本文章的 Markdown 版本，甚至是 json 格式的文件。

```sh
# 默认只爬取 learnreact 专栏
$ eva z
# 默认路径为当前文件夹下
$ eva z [zhihuzhuanlanId]
# 自定义下载位置
$ eva z [zhihuzhuanlanId] -o <path>
# 下载生成 Markdown 文档的同时，保留 json 文件
$ eva z [zhihuzhuanlanId] -o <path> -f json
```

### 带进度条的下载器

这个使用的是 request 模块做的下载器，其实是为了练手写的。实际上已经可以使用来下载东西了，支持断点下载。

### 二维码

一个简单的二维码生成器

### wifi 二维码

基于二维码和 inquirer 实现一个 wifi 二维码的生成器

## 已完成

- [x] 知乎专栏爬虫
- [x] 更新命令
- [x] 带进度条的下载器
- [x] 二维码
- [x] wifi 二维码

## 正在进行

- [ ] 使用 node 和 markdown 发邮件到指定邮箱
- [ ] 完成 bilibili 下载器，api 存在 bug

## 待办

- [ ] 做一个 Node 版本的 you-get 下载器
- [ ] 结巴分词全文统计排序关键词
- [ ] 彩色输出
- [ ] 翻译
- [ ] 纪念日提醒
- [ ] 每日小 tag

## 最后说点事

我希望这个小项目能更多的人参与进来，一起 DIY 自己的命令行工具集。
