"use strict";
module.exports = function(app, diaryModel, userTModel) {
    app.get("/api/project/user/:userId/search", search);

    function search(req, res) {
        var term = req.query.term;
        var userId = req.params.userId;
        var users = [];
        var results = {};

        searchUsers(term);

        function searchUsers(term) {
            userTModel
                .searchUsersByUsername(term)
                .then(
                    function (usersU) {
                        users = users.concat(usersU);
                        userTModel
                            .searchUsersByFirstName(term)
                            .then(
                                function (usersF) {
                                    var tempList = [];
                                    for (var x in usersF) {
                                        tempList.push(usersF[x]);
                                        for(var y in users) {
                                            if (usersF[x]._id.toString() === users[y]._id.toString()) {
                                                tempList.pop();
                                            }
                                        }
                                    }
                                    users = users.concat(tempList);
                                    userTModel
                                        .searchUsersByLastName(term)
                                        .then(
                                            function (usersL) {
                                                tempList = [];
                                                for (var n in usersL) {
                                                    tempList.push(usersL[n]);
                                                    for(var m in users) {
                                                        if (usersL[n]._id.toString() === users[m]._id.toString()) {
                                                            tempList.pop();
                                                        }
                                                    }
                                                }
                                                users = users.concat(tempList);
                                                results.users = users;
                                                diaryModel
                                                    .searchDiariesByName(term)
                                                    .then(
                                                        function (diaries) {
                                                            results.diaries = diaries;
                                                            diaryModel
                                                                .searchFieldsByName(term)
                                                                .then(
                                                                    function (fields) {
                                                                        var newf = [];

                                                                        for (var f in fields) {
                                                                            newf = newf.concat(fields[f].fields);
                                                                        }
                                                                        results.fields = newf;
                                                                        res.json(results);

                                                                    },
                                                                    function (err) {
                                                                        res.status(400).send(err);
                                                                    }
                                                                )

                                                        },
                                                        function (err) {
                                                            res.status(400).send(err);
                                                        }
                                                    );
                                            },
                                            function (err) {
                                                res.status(400).send(err);
                                            });
                                },
                                function (err) {
                                    res.status(400).send(err);
                                });
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }

    }

};