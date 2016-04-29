//"use strict";
//
//var passport         = require('passport');
//var LocalStrategy    = require('passport-local').Strategy;
//
//module.exports = function(app, projectUserModel, assignmentUserModel, bcrypt) {
//
//    passport.use('project',   new LocalStrategy(projectLocalStrategy));
//    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));
//    passport.serializeUser(serializeUser);
//    passport.deserializeUser(deserializeUser);
//
//    app.post  ('/api/project/login',    passport.authenticate('project'), login);
//    app.post  ('/api/project/logout',   logout);
//    app.get   ('/api/project/loggedin', loggedIn);
//    app.post  ('/api/project/register', register);
//
//    app.post  ('/api/assignment/login',    passport.authenticate('assignment'), assignmentLogin);
//    app.post  ('/api/assignment/logout',   assignmentLogout);
//    app.get   ('/api/assignment/loggedin', assignmentLoggedIn);
//    app.post  ('/api/assignment/register', assignmentRegister);
//
//    function projectLocalStrategy(username, password, done) {
//        projectUserModel
//            .findUserByUsername(username)
//            .then(
//                function(user) {
//                    if(user && bcrypt.compareSync(password, user.password)) {
//                        return done(null, user);
//                    } else {
//                        return done(null, false);
//                    }
//                },
//                function(err) {
//                    if (err) { return done(err); }
//                }
//            );
//    }
//
//    function assignmentLocalStrategy(username, password, done) {
//        assignmentUserModel
//            .findUserByUsername(username)
//            .then(
//                function(user) {
//                    if(user && bcrypt.compareSync(password, user.password)) {
//                        return done(null, user);
//                    } else {
//                        return done(null, false);
//                    }
//                },
//                function(err) {
//                    if (err) { return done(err); }
//                }
//            );
//    }
//
//    function serializeUser(user, done) {
//        done(null, user);
//    }
//
//    function deserializeUser(user, done) {
//
//        if(user.type == 'project') {
//            projectUserModel
//                .findUser(user._id)
//                .then(
//                    function(user){
//                        done(null, user);
//                    },
//                    function(err){
//                        done(err, null);
//                    }
//                );
//        } else if(user.type == 'assignment') {
//            assignmentUserModel
//                .findUserById(user._id)
//                .then(
//                    function(user){
//                        done(null, user);
//                    },
//                    function(err){
//                        done(err, null);
//                    }
//                );
//        }
//    }
//
//    function login(req, res) {
//        var user = req.user;
//        delete user.password;
//        res.json(user);
//    }
//
//    function assignmentLogin(req, res) {
//        var user = req.user;
//        delete user.password;
//        res.json(user);
//    }
//
//    function loggedIn(req, res) {
//        res.send(req.isAuthenticated() ? req.user : '0');
//    }
//
//    function assignmentLoggedIn(req, res) {
//        res.send(req.isAuthenticated() ? req.user : '0');
//    }
//
//    function logout(req, res) {
//        req.logOut();
//        res.send(200);
//    }
//
//    function assignmentLogout(req, res) {
//        req.logOut();
//        res.send(200);
//    }
//
//    function register(req, res) {
//
//        var newUser = req.body;
//        newUser.password = bcrypt.hashSync(newUser.password);
//
//
//        projectUserModel.findUserByUsername(newUser.username)
//            .then(
//                function (user) {
//                    if (user) {
//                        res.json(null);
//                    }
//                    else {
//                        return projectUserModel.createUser(newUser);
//                    }
//                },
//                function (err) {
//                    res.status(400).send(err);
//                }
//            )
//            .then(
//                function (user) {
//                    console.log(user);
//                    if (user) {
//                        req.login(user, function (err) {
//                            if (err) {
//                                res.status(400).send(err);
//                            }
//                            else {
//                                res.json(user);
//                            }
//                        });
//                    }
//                },
//                function (err) {
//                    res.status(400).send(err);
//                });
//    }
//
//    function assignmentRegister(req, res) {
//        var newUser = req.body;
//
//        assignmentUserModel.findUserByUsername(newUser.username)
//            .then(
//                function (user) {
//                    if (user) {
//                        res.json(null);
//                    }
//                    else {
//                        return assignmentUserModel.createUser(newUser);
//                    }
//                },
//                function (err) {
//                    res.status(400).send(err);
//                }
//            )
//            .then(
//                function (user) {
//                    if (user) {
//                        req.login(user, function (err) {
//                            if (err) {
//                                res.status(400).send(err);
//                            }
//                            else {
//                                res.json(user);
//                            }
//                        });
//                    }
//                },
//                function (err) {
//                    res.status(400).send(err);
//                }
//            );
//    }
//};