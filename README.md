# eva

eva 是一个 node 脚本工具集，现在已经有把 [知乎专栏爬虫](https://github.com/bubao/zhihu-zhuanlan)~~和中央天气预报加到里面~~，以后还会加入一些 node 小工具进去。同时欢迎各位喜欢这个项目，想 diy 自己的工具集的朋友参与进来。

## 安装

由于我没有 npmjs 账号，只能这样安装了，需要先安装 cnpm。

```sh
# 获取源码
$ git clone https://github.com/bubao/eva
# 项目的根目录下
$ cd eva
# 安装 Linux 下
$ sudo cnpm i -g .
# 安装 Windows 下
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

### 喜马拉雅下载器

这个命令能下载指定喜马拉雅的作者全部专辑，或者某个专辑的 aria2 的下载地址。

```sh
# 默认下载 tracksID
$ eva x [ID]
# 指定下载的位置
$ eva x [ID] -o <path>
# 如果是 albumsID ，则需要添加 --type(-t) 属性，值是 albums
$ eva x [ID] -o <path> -t albums
```

## 已完成

-   [x] 知乎专栏爬虫
-   [x] 带进度条的下载器
-   [x] 二维码
-   [x] wifi 二维码
-   [x] ~~喜马拉雅下载器~~
-   [x] ~~中央天气预报~~

## 正在进行

-   [ ] 使用 node 和 markdown 发邮件到指定邮箱
-   [ ] 完成 bilibili 下载器，api 存在 bug
-   [ ] 带进度条的下载器还需要进一步完善

## 待办

-   [ ] 做一个 Node 版本的 you-get 下载器
-   [ ] 结巴分词全文统计排序关键词
-   [ ] 彩色输出
-   [ ] 翻译
-   [ ] 纪念日提醒
-   [ ] 每日小 tag

### 知乎专栏爬虫

~~这个项目其实还有很多小 bug，`code`标签转换成 markdown 时是单反引号。目前的 markdown 转换工具使用的是 [h2m](https://github.com/island205/h2m) ，如果有更好的工具请告知我，让我能尽快完善这个小爬虫，谢谢。~~

知乎专栏爬虫已分离成独立模块 [zhihu-zhuanlan](https://github.com/bubao/zhihu-zhuanlan)，基本能用。

### 中央天气预报（已弃用）

~~这个项目用了 [-API](https://github.com/jokermonn/-Api) 提供的 api 写的天气查询，目前还不是很完善，但是已经可以用了，后续继续做些小细节上的工作。~~

这个命令已不能再使用，因为中央天气预报以前的 API 已经不再维护。

### 带进度条的下载器

这个使用的是 request 模块做的下载器，其实是为了练手写的。实际上已经可以使用来下载东西了。

## 最后说点事

我希望这个小项目能更多的人参与进来，一起 DIY 自己的命令行工具集。
