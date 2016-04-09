module.exports = function(app, userModel, formModel) {
    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getFormsForUser(req, res) {
        var id = req.params.userId;
        formModel.findFormsByUserId(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFormById(req, res) {
        var id = req.params.formId;
        formModel.findFormById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {
        var id = req.params.formId;
        formModel.deleteFormById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel.createFormForUser(userId, form)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        var id = req.params.formId;
        var form = req.body;
        formModel.updateForm(id, form)
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