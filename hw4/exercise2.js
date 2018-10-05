const {from} = require('rxjs');
var os = require('os');
function checkSystem(){
    console.log('Checking your system...');
    var sizeOfMemory = bytesToSize(os.totalmem());
    var numberOfCpus = os.cpus().length;
    var b1 = sizeOfMemory<5 ? true : false;
    var b2 = numberOfCpus<3 ? true : false;
    console.log(sizeOfMemory);
    console.log(numberOfCpus);
    if(sizeOfMemory<5){
        console.log('This app needs at least 4 GB of RAM');
    }
    if(numberOfCpus<3){
        console.log('Processor is not supported');
    }
    if(b1==false && b2==false){
        console.log('System is checked succesfully');
    }
    
}
function checkSystemObservable(){
    console.log('Checking your system... Observable Method');
    var sizeOfMemory = bytesToSize(os.totalmem());
    var numberOfCpus = os.cpus().length;
    var b1 = sizeOfMemory<5 ? true : false;
    var b2 = numberOfCpus<3 ? true : false;
    console.log(sizeOfMemory);
    console.log(numberOfCpus);
    let myPromise = new Promise((resolve,error)=>{
        if(sizeOfMemory<5){
            resolve('This app needs at least 4 GB of RAM');
        }
        if(numberOfCpus < 3){
            resolve('Processor is not supported');
        }
        if(b1==false && b2==false){
            resolve('System is checked succesfully');
        }
    });
    from(myPromise).subscribe((e)=>console.log(e));
}
checkSystem();
checkSystemObservable();
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2);
 };