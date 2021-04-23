var express = require('express');
var router = express.Router();
const fs = require("fs");
const cors = require("cors");
const rand = require("random-key");

router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", (req, res) => {
  const adminPassword = "admin";
  let password = req.body.password;

  if (adminPassword === password){
    console.log("Welcome Admin!");
    res.redirect("/admin");
  } else {
    console.log("Try again with the right password! Ain' that difficult!");
    res.redirect("/");
  };

});

router.get('/admin', (req, res) =>{

let content = `<div><h2>Users and Subscribers</h2></div>`;

req.app.locals.db.collection("users").find().toArray()

.then(results=>{

  for (users in results){
    content += `
      <ul>
      <li> <b>User:</b> ${results[users].username} <b>Mail:</b> ${results[users].email} <b> ${results[users].subscription? `Subscribed to Newsletter`: `Not Subscribed to Newsletter`} </b> </li>
      </ul>
     `
  }
  res.send(content);

})
});

module.exports = router;
