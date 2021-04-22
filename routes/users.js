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

 

 res.json(result && result.length && result[0]);

  });

    // let users = JSON.parse(data);

    // let findUser = users.find((users) => users.username == user.username && users.password == user.password);
    
    // if (findUser){
    //   let data = {username: findUser.username, subscription: findUser.subscription, id: findUser.id};
    //   res.json(data)
    // } else {
    //   res.send("Wrong details")
    // }

    // Databas kopplat, då köra koden nedan
    // users.find({"username": user.username},{"password": user.password}).toArray()
    // .then(results => {
    //      console.log(results)
    // });

   });
// });

module.exports = router;