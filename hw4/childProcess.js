var url = require('url');
process.on('message',(msg) =>{
    var result = url.parse(msg,true).query;
    process.send(result.url);
});