module.exports = function(mongoose) {

    var UserSchema =mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        location: String,
        admin: Boolean,
        placesbeento: String,
        placeswannago: String
    }, {collection: 'project.users'});
    return UserSchema;
};