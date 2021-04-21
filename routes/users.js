var express = require('express');
var router = express.Router();
const fs = require("fs");
const cors = require("cors");

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

router.post("/new", (req, res) => {

  let newUser = req.body;
  //console.log(req.body);

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

router.post("/login", (req, res) => {

  let user = req.body;
  //console.log(user);

  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.log(err);
    }

    let users = JSON.parse(data);
    //console.log(users);
    let findUser = users.find((users) => users.username == user.username && users.password == user.password);
    console.log(findUser);

    // Databas kopplat, då köra koden nedan
    // users.find({"username": user.username},{"password": user.password}).toArray()
    // .then(results => {
    //      console.log(results)
    // });

  });

  

  res.json("logga in")
});

module.exports = router;