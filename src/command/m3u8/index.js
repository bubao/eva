let { parseURL, fileName, getTrueURL, MD5, byteSize, time, defaultName } = require('../../tools/utils');
const { path, _, fs, JSDOM, cheerio } = require('../../tools/commonModules');
let ProgressBar = require('../../modules/ProgressBar');
let pb = new ProgressBar({ 'description': 'm3u8', bar_length: 50 });
let { Get } = require('../../tools/request');

var match = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/g;

module.exports = async(uri,name)=>{
    let cons = await Get({uri});
    console.log(cons)
    Mu3(cons,name);
}

let Mu3=(url, name) =>{
    urls = match.exec(url);
    name = name ||defaultName(url);
    console.log('urls',urls)
    console.log('name',name)
    if (urls.length) {
        _.foreach(urls,(item,index)=>{
            if(item.indexOf('.m3u8')>0){
                stream(item,name);
            }else{
                console.log('没有m3u8链接');
            }
        })
    }else{
        console.log('没有链接');
    }
    
}
let stream = (url, name) => {
    name = name || fileName(defaultName(url), 'mp4');
    m3u8stream(url)
        .pipe(fs.createWriteStream(name));
}