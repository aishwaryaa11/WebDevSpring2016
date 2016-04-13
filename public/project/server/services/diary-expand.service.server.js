module.exports = function(app, diaryModel) {
    app.get("/api/project/diary/:diaryId/field", fieldsForDiaryId);
    app.get("/api/project/diary/:diaryId/field/:fieldId", getFieldById);
    app.delete("/api/project/diary/:diaryId/field/:fieldId", deleteFieldById);
    app.post("/api/project/diary/:diaryId/field", addFieldToDiary);
    app.put("/api/project/diary/:diaryId/field/:fieldId", updateFieldById);

    function fieldsForDiaryId(req, res) {
        var diaryId = req.params.diaryId;
        diaryModel.findFieldsByDiaryId(diaryId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldById(req, res) {
        var diaryId = req.params.diaryId;
        var fieldId = req.params.fieldId;
        diaryModel.findField(diaryId, fieldId)
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
        var diaryId = req.params.diaryId;
        var fieldId = req.params.fieldId;
        diaryModel.deleteField(diaryId, fieldId)
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
        var diaryId = req.params.diaryId;
        diaryModel.createField(diaryId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldById(req, res) {
        var field = req.body;
        var fieldId = req.params.fieldId;
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
};