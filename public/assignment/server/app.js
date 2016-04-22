module.exports = function(app, mongoose, db, userModel, bcrypt) {
    var formModel = require("./models/form.model.js")(mongoose, db);

    var userService = require("./services/user.service.server.js") (app, userModel, bcrypt);
    var formService = require("./services/form.service.server.js") (app, formModel, userModel);
    var fieldService = require("./services/field.service.server.js") (app, formModel);
}