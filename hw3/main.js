const Promise = require('promise');
const dns = require('dns');
const{from} = require('rxjs');
//lookup is better than resolve4() method
dns.lookup('www.mum.edu',(err,address,family)=>{
new Promise(function(resolve,reject) { resolve(console.log('address: %j family: IPv%s',address,family)); })
});
function useObservable(){
    dns.lookup('www.mum.edu',(err,address,family)=>{
         myPromise = new Promise((resolve,reject) => {setTimeout(function(){
              resolve(`address is ${address}, IPFamily is V${family} and this is using Observable`);},1000); });
        from(myPromise).subscribe((e)=>console.log(e));
        });
}
useObservable();