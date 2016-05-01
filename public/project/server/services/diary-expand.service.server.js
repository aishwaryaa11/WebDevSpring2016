module.exports = function(app, userTModel, diaryModel, auth) {
    app.get("/api/project/field/:fieldId", auth, findFieldById);
    app.get("/api/project/field", auth, findAllFields);
    app.get("/api/project/user/:userId/field", auth, findFieldsByUserId);
    app.delete("/api/project/diary/:diaryId/field/:fieldId", auth, deleteFieldById);
    app.post("/api/project/diary/:diaryId/field", auth, addFieldToDiary);
    app.put("/api/project/diary/:diaryId/field", auth, updateFieldById);
    app.get("/api/project/diary/:diaryId/field", auth, findFieldsByDiaryId);


    function findAllFields(req, res) {
        diaryModel
            .findAllFields()
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldById(req, res) {
        diaryModel.findField(req.params.fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldById(req, res) {
        diaryModel.deleteField(req.params.fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addFieldToDiary(req, res) {
        var field = req.body;

        field.created = new Date;
        diaryModel.createField(req.params.diaryId, field)
            .then(
                function (field) {
                    res.json(field);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldById(req, res) {
        var field = req.body;

        var diaryId = req.params.diaryId;
        diaryModel.updateField(diaryId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldsByUserId(req, res) {
        userTModel
            .findUser(req.params.userId)
            .then(
                function (user) {
                    diaryModel
                        .findFieldsByUserId(user._id)
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

    function findFieldsByDiaryId(req, res) {
        diaryModel
            .findFieldsByDiaryId(req.params.diaryId)
            .then(
                function (doc) {
                    res.send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};