module.exports = function(app, userTModel, diaryModel, authorized, bcrypt) {

    var passport         = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;

    var auth = authorized;
    var admin = admin;
    app.post("/api/project/user", userRouter);
    app.get("/api/project/user/:id", auth, findUserById);
    app.put("/api/project/user/", auth, updateUser);
    app.delete("/api/project/user/:id", auth, deleteUser);
    app.get("/api/project/:diaryId/user", auth, findUserByDiaryId);
    app.get("/api/project/diary/:fieldId/user", auth, findUserByFieldId);

    passport.use('project',   new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/project/login',    passport.authenticate('project'), login);
    app.post  ('/api/project/logout',   logout);
    app.get   ('/api/project/loggedin', loggedIn);
    app.post  ("/api/project/register", register);


    function projectLocalStrategy(username, password, done) {
        userTModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userTModel
            .findUser(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function userRouter(req, res) {
        if (req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        }
        else if (req.query.username) {
            findUserByUsername(req, res);
        }
        else {
            getUsers(req, res);
        }
    }

    function getUsers(req, res) {
        userTModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.id;

        userTModel.findUser(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;

        userTModel
            .findUser(user._id)
            .then(
                function (user2) {
                    if (user2.password !== user.password) {
                        user.password = bcrypt.hashSync(user.password);
                    }
                    userTModel.updateUser(user)
                        .then(
                            function (na) {
                                userTModel
                                    .findUser(user._id)
                                    .then(
                                        function (doc) {
                                            res.json(doc);
                                        }
                                    ),
                                    function (err) {
                                        res.status(400).send(err);
                                    }
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var cred = {
            username: req.query.username,
            password: req.query.password
        };
        userTModel.findUserByCredentials(cred)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUserByUsername(req, res) {
        var uName = req.query.username;
        userTModel.findUserByUsername(uName)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        userTModel.deleteUser(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByDiaryId(req, res) {
        diaryModel
            .findDiaryById(req.params.diaryId)
            .then(
                function (diary) {
                    userTModel.findUsersById(diary.userId)
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByFieldId(req, res) {

        diaryModel
            .findField(req.params.diaryId)
            .then(
                function(field) {
                    userTModel.findUsersById(field.userId)
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function admin(req, res, next) {
        if(!req.user.admin) {
            res.send(403);
        }
        next();
    }

    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {

        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);


        userTModel.findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    }
                    else {
                        return userTModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    console.log(user);
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
};