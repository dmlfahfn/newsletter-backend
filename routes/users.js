var express = require('express');
var router = express.Router();
const fs = require("fs");
const cors = require("cors");
const rand = require("random-key");
const cryptoJS = require("crypto-js");

router.use(cors());

/* GET users listing. */
router.get('/', function(req, res, next) {

  req.app.locals.db.collection("users").find().toArray()

  .then(results=>{
    res.send(results);

  })
});

//New User
router.post("/new", (req, res) => {

  let newUser = req.body;
  console.log(newUser);
  if (newUser === "{}"){
    res.status(400).send({message: "Please fill all the information required!"}) 
    return; 
  }
  newUser.id = rand.generate();
  console.log(newUser);
  let cryptPassword = cryptoJS.AES.encrypt(newUser.password, "bismillah").toString();
  newUser.password = cryptPassword; 
  
  req.app.locals.db.collection("users").insertOne(newUser)

  .then(result=>{

 console.log(result);

 res.redirect("/");

  });
});

const logIn = async(req) => {
  let user = req.body;
  return req.app.locals.db.collection("users").find({"username": user.username}).toArray()

  .then(result=>{
  console.log(result);
  let bytes = cryptoJS.AES.decrypt(result[0].password, "bismillah");
  let password = bytes.toString(cryptoJS.enc.Utf8);
  console.log("input password", user.password);
  console.log("password",password);
  result[0].password = password;
  return result[0]
  
})};

//Sending Data for logIn
router.post("/login", (req, res) => {

  let user = req.body;
  logIn(req).then(result => {
    if (result == " "){
      console.log("No User");
      res.json({"code": "ERROR"});
    } else {
      if (result.password == user.password){
        console.log("Excellent, 10 points to Gryffindor!");
        res.json({"code": "OK", "userId": result.id, "subscription": result.subscription})
      } else {
        console.log("Please retry with correct password!");
        res.json({"code": "ERROR"});
      };
    };
  })

  });


router.post("/change", (req, res) => {
  let user = req.body;
  logIn(req).then(result => {
    if (result == " "){
      console.log("No User");
      res.json({"code": "ERROR"});
    } else {
      if (result.password == user.password){
        req.app.locals.db.collection("users").updateOne({"username": user.username,}, {$set:{"subscription": user.subscription }})
        console.log("Excellent, 10 points to Gryffindor!");
        res.json({"code": "OK", "userId": result.id, "subscription": user.subscription})
      } else {
        console.log("Please retry with correct password!");
        res.json({"code": "ERROR"});
      };
    };
  })
})
module.exports = router;