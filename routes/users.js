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
  // if (newUser === "{}"){
  //   res.status(400).send({message: "Please fill all the information required!"}) 
  //   return; 
  // }
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

//Sending Data for logIn
router.post("/login", (req, res) => {

  let user = req.body;
  
  let password = cryptoJS.AES.decrypt(user.password, "bismillah").toString();
  
  req.app.locals.db.collection("users").find({"username": user.username, "password": password, subscription: false}).toArray()

  .then(result=>{
  console.log(result);
  
  console.log("result password", result[0].password);
  console.log("input password", user.password);

  if (result == " "){
    console.log("No User");
    res.json({"code": "ERROR"});
  } else {
    if (result[0].password == user.password){
      console.log("Excellent, 10 points to Gryffindor!");
      res.json({"code": "OK", "userId": result[0].id})
    } else {
      console.log("Please retry with correct password!");
      res.json({"code": "ERROR"});
    };
  };

 res.json(result && result.length && result[0]);

  });
});

module.exports = router;