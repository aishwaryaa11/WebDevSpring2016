var q = require("q");

module.exports = function (mongoose, db) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserTModel = mongoose.model('UserT', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUser: findUser,
        findAllUsers: findAllUsers,
        createUser: createUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        findUsersById: findUsersById,
        searchUsersByUsername: searchUserByUsername,
        searchUsersByFirstName: searchUserByFirstName,
        searchUsersByLastName: searchUserByLastName
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


    function findUser(userId) {
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

    function deleteUser(userId) {
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
        newUser.type = "project";
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
            // password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
            admin: user.admin,
            placesbeento: user.placesbeento,
            placeswannago: user.placeswannago,
            type: user.type
        };

        var deferred = q.defer();
        UserTModel
            .findByIdAndUpdate(userId, {$set:newUser}, {new: true, upsert: true}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }


    function findUsersById(userIds) {

        var deferred = q.defer();

        UserTModel.find({_id : {$in: userIds}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function searchUserByUsername(username) {
        var deferred = q.defer();

        UserTModel.find({'username': {$regex: username, $options: 'i'}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function searchUserByFirstName(firstName) {
        var deferred = q.defer();

        UserTModel.find({'firstName': {$regex: firstName, $options: 'i'}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function searchUserByLastName(lastName) {
        var deferred = q.defer();

        UserTModel.find({'lastName': {$regex: lastName, $options: 'i'}}, function (err, doc) {
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