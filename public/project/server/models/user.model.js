var q = require("q");

module.exports = function (mongoose, db) {

    var UserTSchema = require("./user.schema.server.js")(mongoose);
    var UserTModel = mongoose.model('UserT', UserTSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername
    };

    return api;

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserTModel.findOne({username: username}, function(err, doc) {
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
        UserTModel.findOne(
            {username: credentials.username,
                password: credentials.password},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserTModel.findById(userId, function (err, doc) {
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
        UserTModel.find({}, function (err, doc) {
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
        UserTModel.remove({_id: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }

    function createUser(newUser) {
        var deferred = q.defer();
        UserTModel.create(newUser, function(err, doc) {
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
            email: user.email,
            location: user.location,
            placesbeento: user.placesbeento,
            placeswannago: user.placeswannago
        };

        var deferred = q.defer();
        UserTModel.findByIdAndUpdate(userId, {$set:newUser}, {new: true, upsert: true}, function(err, doc) {
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