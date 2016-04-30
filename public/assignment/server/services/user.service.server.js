//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userModel) {

    var auth = authorized;
    var admin = adminfunc;

    app.post("/api/assignment/user", auth, createUser);
    app.get("/api/assignment/userCred/:username/:password", auth ,findUserByCredentials);
    app.get("/api/assignment/user", auth,  userRouter);
    app.get("/api/assignment/user/:userId", auth, findUserById);
    app.get("/api/assignment/user?username=username", auth, findUserByUsername);
    app.put("/api/assignment/user/:userId", auth, updateUser);
    app.delete("/api/assignment/user/:userId", auth, deleteUser);
    app.get("/api/assignment/admin/user", auth, admin, findAllUsers);
    app.get("/api/assignment/admin/user/:userId", auth, admin, findUserById);
    app.post("/api/assignment/admin/user", auth, admin, createUser);
    app.delete("/api/assignment/admin/user/:userId", auth, admin, deleteUser);
    app.put("/api/assignment/admin/user/:userId", auth, admin, updateUser);


    //passport.use(new LocalStrategy(localStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);
    //
    //function localStrategy(username, password, done){
    //
    //    userModel
    //        .findUserByUsername(username)
    //        .then(
    //            function (user) {
    //                console.log(user);
    //                if (user && bcrypt.compareSync(password, user.password)) {
    //                    return done(null, user);
    //                }
    //                else {
    //                    return done(null, false);
    //                }
    //            },
    //            function (err){
    //                if (err) { return done (err); }
    //            }
    //        );
    //}
    //
    //function serializeUser(user, done){
    //    delete user.password;
    //    done(null, user);
    //}
    //
    //function deserializeUser(user, done){
    //    userModel
    //        .findUserById(user._id)
    //        .then(
    //            function (user) {
    //                delete user.password;
    //                done(null, user);
    //            },
    //            function (err) {
    //                done(err, null);
    //            }
    //        )
    //}



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



    function findAllUsers(req, res) {
        userModel.findAllUsers()
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

        userModel.createUser(req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getUsers(req, res) {
        userModel.findAllUsers()
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
        var userId = req.params.userId;

        userModel.findUserById(userId)
            .then(
                function (doc) {
                    delete doc.password;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;

        user.password = bcrypt.hashSync(user.password);

        userModel.updateUser(userId, user)
            .then(
                function (na) {
                    userModel.findUserById(req.user._id)
                        .then(
                            function (doc) {
                                console.log("this is coming back from find user by id");
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
        userModel.findUserByCredentials(cred)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUserByUsername(req, res) {
        var uName = req.query.username;
        userModel.findUserByUsername(uName)
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
        var id = req.params.userId;
        userModel.deleteUserById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function adminfunc(req, res, next) {
        if(req.user.roles.indexOf("admin") === -1) {
            res.send(403);
        }
        next();
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};