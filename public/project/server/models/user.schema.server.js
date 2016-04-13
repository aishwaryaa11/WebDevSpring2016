module.exports = function(mongoose) {

    var UserTSchema =mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: [String],
        location: [String], //could enter multiple locations
        placesbeento: [String],
        placeswannago: [String]
    }, {collection: 'project.users'});
    return UserTSchema;
};