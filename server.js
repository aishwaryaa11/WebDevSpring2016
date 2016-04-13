var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');
var multer = require('multer');
var session = require('express-session');
var passport = require('passport');
var uuid = require('node-uuid');
var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/webdevdb/';

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

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());

require("./public/assignment/server/app.js")(app, uuid, mongoose, db);
require("./public/project/server/app.js") (app, uuid, mongoose, db);

app.listen(port, ipaddress);