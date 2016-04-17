module.exports = function(mongoose) {

    var UserTSchema =mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        location: String,
        placesbeento: String,
        placeswannago: String
    }, {collection: 'project.users'});
    return UserTSchema;
};