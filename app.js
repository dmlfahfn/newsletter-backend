var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const MongoClient=require("mongodb").MongoClient;
const client = new MongoClient("mongodb+srv://adminUser:adminPassword@cluster0.mhts8.mongodb.net/users?retryWrites=true&w=majority");

MongoClient.connect("mongodb+srv://adminUser:adminPassword@cluster0.mhts8.mongodb.net/users?retryWrites=true&w=majority",{ useUnifiedTopology: true }
,(err, client)=>{

    console.log("Database  is conected");
    const db =client.db("users");
    app.locals.db=db ;

});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
