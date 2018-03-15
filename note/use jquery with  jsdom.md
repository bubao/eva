# 在jsdom中使用jquery

写爬虫的时候发现cheerio处理table太麻烦了，虽然相比jsdom操作方便，可是遇到有些有rows的cells嵌套不一样时，就很麻烦。

jsdom操作不得不说很麻烦，所以借助jquery，希望能达到cheerio一样简便的操作。

```js
//https://stackoverflow.com/questions/30223265/how-to-use-jquery-with-jsdom5
var jsdom = require('jsdom').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);
```