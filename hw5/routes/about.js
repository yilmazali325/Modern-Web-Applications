var express = require('express');
var router = express.Router();
const axios = require('axios');
const{from} = require('rxjs');
// About page route.
router.get('/about', function (req, res) {
    performGetRequestObservable();
  res.send('About this wiki');
})
function performGetRequestPromise() {
    axios.get('http://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });   
}
async function performGetRequestAsync() {
    try{
        return await performGetRequestPromise();
    }catch(error){
        console.log(error);
    }
 }
 function performGetRequestObservable() {
  let myPromise = new Promise((resolve,reject) => {
    axios.get('http://jsonplaceholder.typicode.com/users')
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      reject(error);
  }); 
  });
  from(myPromise).subscribe((e)=>console.log(e));
}
module.exports = router;
