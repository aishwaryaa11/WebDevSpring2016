module.exports = function(mongoose) {

    var UserSchema =mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        email: [String]
    }, {collection: 'assignment.users'});
    return UserSchema;
};