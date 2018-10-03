const {from} = require('rxjs');
Array.prototype.removeDuplicatess = function(){
    //ES6 gives us the Set object, which (for all intents and purposes) is a unique array
    console.log(Array.from(new Set(this)));
};

Array.prototype.removeDuplicatesPromise = function(){
    var a = this;
    return  new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(console.log(Array.from(new Set(a))));
        }, 1000);  
  });
};

Array.prototype.removeDuplicatesAsync = async function(){
    var a = this;
    let promise = new Promise((resolve,reject) => {
          setTimeout(() => {
            resolve(Array.from(new Set(a)));
          }, 1000);  
    });
        let result = await promise;
        console.log(result);
};
Array.prototype.removeDuplicatesObservable = function(){
    var a = this;
    let promise = new Promise((resolve,reject) => {
          setTimeout(() => {
            resolve(Array.from(new Set(a)));
          }, 2000);  
    });
      from(promise).subscribe((e) => console.log(e))
};

function isWeekend(){
    const todayDate = new Date();
    const day = todayDate.getDay();
    dayType = day == 0 ? "weekend" : day == 1 ? "weekday" : day == 2 ? "weekday" :
     day == 3 ? "weekday" : day == 4 ? "weekday" : day == 5 ? "weekday" : day == 6 ? "weekend" :  "notaweekday";
     console.log(dayType);
}
const item ={
    "name" : "Biscuits",
    "type" : "regular",
    "category" : " food",
    "price" : 2.0
}
function applyCoupon(category){
   return(discount) => {
       return(item) => {
           return item.price -= item.price * discount;
       };
   };
}
[4,1,5,7,2,3,1,4,6,5,2].removeDuplicatess();
[4,1,5,7,2,3,1,4,6,5,2].removeDuplicatesPromise();
[4,1,5,7,2,3,1,4,6,5,2].removeDuplicatesAsync();
[4,1,5,7,2,3,1,4,6,5,2].removeDuplicatesObservable();
isWeekend();
console.log(applyCoupon("food")(0.1)(item).price);