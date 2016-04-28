module.exports = function(app, mongoose, db, userTModel, diaryModel, bcrypt) {

    var userService = require("./services/user.service.server.js")(app, userTModel, diaryModel, authorized, bcrypt);
    var diaryService = require("./services/diary.service.server.js")(app, diaryModel, authorized);
    var diaryExpandService = require("./services/diary-expand.service.server.js")(app, userTModel, diaryModel, authorized);
    var searchService = require("./services/search.service.server.js") (app, diaryModel, userTModel, authorized);


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};