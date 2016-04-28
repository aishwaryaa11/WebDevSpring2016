module.exports = function(mongoose) {

    var DiaryExpandSchema = mongoose.Schema({
        title: String,
        userId: String,
        text: String,
        options: [{label: String, value: String}], //2 options: diary body or tags
        created: Date,
        updated: Date
    }, {collection: 'project.fields'});
    return DiaryExpandSchema;
};