const {Subject} = require('rxjs');
const http = require('http');
const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname,'file.exe');
const subject = new Subject();

//Server 1 
let server1Counter = 0;
http.createServer((request,response) =>{
    server1Counter++;
    let count = server1Counter;
    let startTime = new Date();
    console.log('[SERVER 1 - REQUEST '+count+'] -> Resquest received');
    let file = fs.readFileSync(filePath);
    console.log('[SERVER 1 - REQUEST '+count+'] -> SYNC reading done --- TIME:'+ (new Date().getTime() - startTime.getTime()));
    response.end(file).on('finish', () => {
        console.log('[SERVER 1 - REQUEST '+count+'] -> File transfered --- TIME:'+ (new Date().getTime() - startTime.getTime()));    
    });
    console.log('[SERVER 1 - REQUEST '+count+'] -> End of resquest process reached --- TIME:'+ (new Date().getTime() - startTime.getTime()));
}).listen(8000);


//Server 2
let server2Counter = 0;
http.createServer((request,response) =>{
    server2Counter++;
    let count = server2Counter;
    let startTime = new Date();
    console.log('[SERVER 2 - REQUEST '+count+'] -> Resquest received');
    fs.readFile(filePath, (err,data) => {
        console.log('[SERVER 2 - REQUEST '+count+'] -> ASYNC reading done --- TIME:'+ (new Date().getTime() - startTime.getTime()));
        response.end(data).on('finish', () =>{
            console.log('[SERVER 2 - REQUEST '+count+'] -> File transfered --- TIME:'+ (new Date().getTime() - startTime.getTime()));
        });
    });
    console.log('[SERVER 2 - REQUEST '+count+'] -> End of resquest process reached --- TIME:'+ (new Date().getTime() - startTime.getTime()));
}).listen(8001);



//Server 3
let server3Counter = 0;
http.createServer((request,response) =>{
    server3Counter++;
    let count = server3Counter;
    let startTime = new Date();
    console.log('[SERVER 3 - REQUEST '+count+'] -> Resquest received');
    let readStream = fs.createReadStream(filePath);
    console.log('[SERVER 3 - REQUEST '+count+'] -> ReadStream Created --- TIME:'+ (new Date().getTime() - startTime.getTime()));
    readStream.pipe(response).on('finish', ()=>{
        console.log('[SERVER 3 - REQUEST '+count+'] -> File transfered --- TIME:'+ (new Date().getTime() - startTime.getTime()));    
    });
    console.log('[SERVER 3 - REQUEST '+count+'] -> End of resquest process reached --- TIME:'+ (new Date().getTime() - startTime.getTime()));
}).listen(8002);



//Server 4
let server4Counter = 0;
http.createServer((request,response) => {
    server4Counter++;
    let count = server4Counter;
    let startTime = new Date();
    console.log('[SERVER 4 - REQUEST '+count+'] -> Resquest received');
    let readStream = fs.createReadStream(filePath,{highWaterMark:16*1024});
    console.log('[SERVER 4 - REQUEST '+count+'] -> ReadStream Created (Size of chunk defined) --- TIME:'+ (new Date().getTime() - startTime.getTime()));
    readStream.pipe(response).on('finish', ()=>{
        console.log('[SERVER 4 - REQUEST '+count+'] -> File transfered --- TIME:'+ (new Date().getTime() - startTime.getTime()));
    });
    console.log('[SERVER 4 - REQUEST '+count+'] -> End of resquest process reached --- TIME:'+ (new Date().getTime() - startTime.getTime()));
}).listen(8003);

//Server 5
let server5Counter = 0;
function sendStream(reqres){
    reqres.stream.pipe(reqres.response).on('finish',()=>{
        console.log('[SERVER 5 - REQUEST '+reqres.count+'] -> File transfered (Suscriber) --- TIME:'+ (new Date().getTime() - reqres.startTime.getTime()));
    });
    console.log('[SERVER 5 - REQUEST '+reqres.count+'] -> End of resquest process reached (Suscriber) --- TIME:'+ (new Date().getTime() - reqres.startTime.getTime()));
}

subject.subscribe(sendStream);

http.createServer((request,response)=>{
    server5Counter++;
    let count = server5Counter;
    let startTime = new Date();
    console.log('[SERVER 5 - REQUEST '+count+'] -> Resquest received');
    let readStream = fs.createReadStream(filePath,{highWaterMark:16*1024});
    console.log('[SERVER 5 - REQUEST '+count+'] -> ReadStream Created (Size of chunk defined) --- TIME:'+ (new Date().getTime() - startTime.getTime()));
    subject.next({request:request, 
        response:response, 
        stream:readStream,
        startTime:startTime,
        count:count});
    console.log('[SERVER 5 - REQUEST '+count+'] -> Stream sent to suscribers --- TIME:'+ (new Date().getTime() - startTime.getTime()));
}).listen(8004);