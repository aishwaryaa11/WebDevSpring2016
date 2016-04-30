module.exports = function(app, userTModel, diaryModel, authorized, bcrypt) {


    var auth = authorized;
    var admin = admin;
    app.post("/api/project/user", userRouter);
    app.get("/api/project/user/:id", auth, findUserById);
    app.put("/api/project/user/:userId", auth, updateUser);
    app.delete("/api/project/user/:id", auth, deleteUser);
    app.get("/api/project/:diaryId/user", auth, findUserByDiaryId);
    app.get("/api/project/diary/:fieldId/user", auth, findUserByFieldId);
    app.get("/api/project/admin/user", auth, admin, findAllUsers);
    app.get("/api/project/admin/user/:userId", auth, admin, findUserById);
    app.post("/api/project/admin/user", auth, admin, createUser);
    app.delete("/api/project/admin/user/:userId", auth, admin, deleteUser);
    app.put("/api/project/admin/user/:userId", auth, admin, updateUser);


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
                    res.send(doc);
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
                    delete doc.password;
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;

        console.log("updated user:"+user);
        console.log(userId);

        user.password = bcrypt.hashSync(user.password);

        userTModel.updateUser(userId, user)
            .then(
                function (na) {
                    userTModel.findUserById(userId)
                        .then(
                            function (doc) {
                                console.log(doc);
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
                    res.send(doc);
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
                    res.send(doc);
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
                    res.send(doc);
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
                                res.send(doc);
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
                                res.send(doc);
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


    function findAllUsers(req, res) {
        userTModel.findAllUsers()
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function createUser(req, res) {
        userTModel.createUser(req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }


    function admin(req, res, next) {
        if(!req.user.admin) {
            res.send(403);
        }
        next();
    }

};