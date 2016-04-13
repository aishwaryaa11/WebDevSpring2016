module.exports = function(app, userModel, diaryModel) {
    app.get("/api/project/user/:userId/diary", getDiariesForUser);
    app.get("/api/project/diary/:diaryId", getDiaryById);
    app.delete("/api/project/diary/:diaryId", deleteDiaryById);
    app.post("/api/project/user/:userId/diary", createDiaryForUser);
    app.put("/api/project/diary/:diaryId", updateDiaryById);

    function getDiariesForUser(req, res) {
        var id = req.params.userId;
        diaryModel.findDiariesByUserId(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getDiaryById(req, res) {
        var id = req.params.diaryId;
        diaryModel.findDiaryById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteDiaryById(req, res) {
        var id = req.params.diaryId;
        diaryModel.deleteDiaryById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createDiaryForUser(req, res) {
        var userId = req.params.userId;
        var diary = req.body;
        diaryModel.createDiaryForUser(userId, diary)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateDiaryById(req, res) {
        var id = req.params.diaryId;
        var diary = req.body;
        diaryModel.updateDiary(id, diary)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    status(400).send(err);
                }
            );
    }
};