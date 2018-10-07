var express = require('express');
var router = express.Router();
var app = new express();
const axios = require('axios');
var fs = require('fs');
var student = {
  "student3" : {
    "id" : 3,
    "name" : "Ali Yilmaz",
    "course" : "CS572",
    "grade" : 100
}
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/listStudents', function(req, res, next) {
  fs.readFile(__dirname + "/" + "users.json","utf8",function(err,data){
    console.log(data);
    res.end(data);
  });
});
router.post('/add', function(req, res, next) {
  res.render('index', { title: 'awdadaw' });
});
router.post('/addStudent',function(req,res){
  //First read existing user
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err,data){
    data = JSON.parse(data);
    data["student3"] = student["student3"];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});
router.get('/:id', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     var users = JSON.parse( data );
     var user = users["student" + req.params.id] 
     console.log( user );
     res.end( JSON.stringify(user));
  });
})
router.delete('/deleteStudent',function(req,res){
  fs.readFile(__dirname + "/" + "users.json",'utf8',function(err,data){
    data = JSON.parse(data);
    delete data["student2"];
    console.log(data);
    res.end(JSON.stringify(data));
  })
});
module.exports = router;
