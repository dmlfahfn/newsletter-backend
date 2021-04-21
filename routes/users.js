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
  console.log(req.body);

  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.log(err);
    }

    let users = JSON.parse(data);
    users.subscription = false;
    users.push(newUser)
    
    console.log(users);

    fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
      if (err){
        console.log(err);
      };
    });

  });

  res.json("ny användare");
});

module.exports = router;