module.exports = function(app, uuid, mongoose, db) {
    var userModel = require("./models/user.model.js")(uuid, mongoose, db);
    var diaryModel = require("./models/diary.model.js")(uuid, mongoose, db);
    var photoModel = require("./models/photo.model.js")(uuid, mongoose, db);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var diaryService = require("./services/diary.service.server.js")(app, userModel, diaryModel);
    var diaryExpandService = require("./services/diary-expand.service.server.js")(app, diaryModel);
    var photoService = require("./services/photo.service.server.js")(app, userModel, photoModel);
    var photoExpandService = require("./services/photo-expand.service.server.js")(app, photoModel);

};