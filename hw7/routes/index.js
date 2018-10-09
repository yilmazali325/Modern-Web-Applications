var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const decipher = crypto.createDecipher('aes256','asaadsaad');
var encryptedValue;
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://127.0.0.1:27017/testDB',function(err,client){
  if(err) throw err;
  const db = client.db('mydb');
  db.collection('homework7').findOne({},function(err,doc){
    if(err) throw err;
    console.dir(doc.message);
    encryptedValue = doc.message;
    client.close();
  });
  console.log(decipher.read(encryptedValue));
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/secret',function(req,res,next){
  res.end(decipher.read(encryptedValue));
});
module.exports = router;
