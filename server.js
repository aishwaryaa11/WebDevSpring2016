var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');
var passport = require('passport');
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var connectionString = 'mongodb://127.0.0.1:27017/webdevdb';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


var UserModel = require("./public/assignment/server/models/user.model.js")(mongoose, db);
var DiaryModel = require("./public/project/server/models/diary.model.js") (mongoose, db);
var UserTModel = require("./public/project/server/models/user.model.js") (mongoose, db);

//require("./public/security/security.js") (app, UserTModel, UserModel, bcrypt);
require("./public/assignment/server/app.js")(app, mongoose, db, UserModel, bcrypt);
require("./public/project/server/app.js") (app, mongoose, db, UserTModel, DiaryModel, bcrypt);

app.listen(port, ipaddress);
