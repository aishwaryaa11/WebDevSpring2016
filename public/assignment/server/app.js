module.exports = function(app, uuid, mongoose, db) {
    var userModel = require("./models/user.model.js")(uuid, mongoose, db);
    var formModel = require("./models/form.model.js")(uuid, mongoose, db);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, userModel, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);

};