var q = require('q');

module.exports = function (mongoose, db) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        createUser: createUser,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername
    };

    return api;

    function findUserByUsername(username) {

        var deferred = q.defer();

        UserModel.findOne({username: username}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        UserModel.findOne(
            {username: credentials.username,
                password: credentials.password},
            function (err, doc) {
                if (err) {
                    console.log(err);
                    deferred.reject(err);
                }
                else {
                    console.log(doc);
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId) {

        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {

        var deferred = q.defer();

        UserModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteUserById(userId) {

        var deferred = q.defer();

        UserModel.remove({_id: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }

    function createUser(user) {

        var deferred = q.defer();
        user.type = "assignment";
        console.log(user);

        UserModel.create(user, function(err, doc) {

            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateUser(userId, user) {

        var newUser = {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            emails: user.emails,
            phones: user.phones,
            roles: user.roles,
            type: "assignment"
        };

        var deferred = q.defer();

        UserModel.findByIdAndUpdate(userId, {$set:newUser}, {new: true, upsert: true}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
};