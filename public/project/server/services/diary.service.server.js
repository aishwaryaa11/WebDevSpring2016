module.exports = function(app, diaryModel, auth) {
    app.get("/api/project/diary/:diaryId", auth, getDiaryById);
    app.get("/api/project/diary", auth, getAllDiaries);
    app.get("/api/project/user/:userId/diary", auth, getDiariesByUserId);
    app.delete("/api/project/diary/:diaryId", auth, deleteDiaryById);
    app.post("/api/project/diary", auth, createDiaryForUser);
    app.put("/api/project/diary", auth, updateDiarybyId);

    function getDiariesByUserId(req, res) {
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

    function getAllDiaries(req, res) {
        diaryModel
            .findAllDiaries()
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
        var diary = req.body;
        diaryModel.createDiaryForUser(diary)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateDiarybyId(req, res) {
        var diary = req.body;
        diaryModel.updateDiary(diary)
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