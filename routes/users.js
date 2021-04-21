var express = require('express');
var router = express.Router();
const fs = require("fs");
const cors = require("cors");
const rand = require("random-key");

router.use(cors());

/* GET users listing. */
router.get('/', function(req, res, next) {

  fs.readFile("users.json", (err, data) => {
    if (err){
      console.log(err);
    };

    let users = JSON.parse(data);

    res.json(users);
  });
});

//New User
router.post("/new", (req, res) => {

  let newUser = req.body;
  newUser.id = rand.generate();
  console.log(newUser);

  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.log(err);
    }

    let users = JSON.parse(data);
    users.push(newUser)

    fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
      if (err){
        console.log(err);
      };
    });

  });

  res.json("ny användare");
});

//Sending Data for logIn
router.post("/login", (req, res) => {

  let user = req.body;

  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.log(err);
    }

    let users = JSON.parse(data);

    let findUser = users.find((users) => users.username == user.username && users.password == user.password);
    
    if (findUser){
      res.json(findUser.username, findUser.subscription)
    } else {
      res.send("Wrong details")
    }

    // Databas kopplat, då köra koden nedan
    // users.find({"username": user.username},{"password": user.password}).toArray()
    // .then(results => {
    //      console.log(results)
    // });

  });
});

module.exports = router;