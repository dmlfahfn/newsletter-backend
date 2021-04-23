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
  content += "<ul>"
  const subscribers = [];
  for (users in results){
    content += `
    <li> <b>User:</b> ${results[users].username}</li>
     `
     if (results[users].subscription){
       subscribers.push(results[users]);
     }
    }
  
    content += "</ul>";
  for (const user of subscribers){
    if (user.subscription){
      content += `<div><b>Mail:</b> ${user.email} <b> ${user.subscription? `Subscribed to Newsletter`: `Not Subscribed to Newsletter`} </b><div>`
    } else {
      console.log("No Subscription!");
    }
  }

  res.send(content);

})
});


module.exports = router;
