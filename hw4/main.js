const Rx = require('rx');
const requests = new Rx.Subject();
const {fork} = require('child_process');
var url = require('url');

function sendHello(e){
  /*  console.log('sending Hello');
    e.res.writeHead(200,{'Content-Type': 'text/plain'});
    e.res.write(e.req.url)
    e.res.end('Hello World\n');*/
    const childProcess = fork('childProcess.js');
    childProcess.send(e.req.url);
    childProcess.on('message',result => {
        e.res.end(`Result is ${result}`);
    });
}
requests.subscribe(sendHello);
const http = require('http');
const hostname = '127.0.0.1';
const port = 8000;
http.createServer((req,res)=>{
    requests.onNext({req:req,res:res});
}).listen(port,hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
})