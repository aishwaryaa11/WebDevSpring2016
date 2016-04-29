module.exports = function(app, userTModel, diaryModel, authorized, bcrypt) {

    var auth = authorized;
    var admin = admin;
    app.post("/api/project/user", userRouter);
    app.get("/api/project/user/:id", auth, findUserById);
    app.get("/api/project/user", login);
    app.put("/api/project/user/", auth, updateUser);
    app.delete("/api/project/user/:id", auth, deleteUser);
    app.get("/api/project/:diaryId/user", auth, findUserByDiaryId);
    app.get("/api/project/diary/:fieldId/user", auth, findUserByFieldId);

    function login(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var response = {
            username: username,
            password: password
        };
        res.json(response);
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
};