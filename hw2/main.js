Array.prototype.even = function(){
    for(let i=1;i<=this.length;i++){
       if(i%2 == 0)
        console.log(i);
    }
}
Array.prototype.odd = function(){
    for(let i=0;i<=this.length;i++){
        if(i%2 == 1)
        console.log(i);
        }
}
console.log('start');
setTimeout(() => {[1,2,3,4,5,6,7,8].even();},1000)
setTimeout(() => {[1,2,3,4,5,6,7,8].odd();},1000)
console.log('end');